from nodes.registry import NODE_REGISTRY
import asyncio
from collections import deque, defaultdict


async def run_workflow(workflow):
    state = {}

    node_map = workflow.node_map
    adjacency = workflow.adjacency_list
    reverse = workflow.reverse_adjacency_list

    dependency_count = defaultdict(int)

    for node_id in node_map:
        dependency_count[node_id] = len(reverse.get(node_id, []))

    queue = deque(
        [node_id for node_id, count in dependency_count.items() if count == 0]
    )

    while queue:

        node_id = queue.popleft()
        node = node_map[node_id]

        executor = NODE_REGISTRY.get(node.type)

        dependencies = reverse.get(node_id, [])

        inputs = [state.get(dep) for dep in dependencies]
        input_value = inputs[0] if inputs else None

        ctx = {
            "nodeId": node.id,
            "workflowId": workflow.id,
            "input": input_value,
            "config": node.data,
            "state": state,
        }

        if executor is None:
            raise RuntimeError(f"No executor registered for node type: {node.type}")

        result = executor(ctx)

        if asyncio.iscoroutine(result):
            result = await result

        output_value = (
            result["output"]
            if isinstance(result, dict) and "output" in result
            else result
        )

        state[node_id] = output_value

        condition_result = None

        if isinstance(result, dict):
            condition_result = result.get("conditionResult")
            
        
        for edge in adjacency.get(node_id, []):

            target = edge.target
            if node.type == "Condition":
                selected = "true" if condition_result else "false"
                if edge.sourceHandle == selected:
                    dependency_count[target] -= 1

                    if dependency_count[target] == 0:
                        queue.append(target)


            else:
                dependency_count[target] -= 1

                if dependency_count[target] == 0:
                    queue.append(target)

      

    return state