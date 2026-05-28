from nodes.registry import NODE_REGISTRY
import asyncio


async def run_workflow(workflow):
    state = {}

    for node_id in workflow.execution_order:
        node = workflow.node_map[node_id]

        executor = NODE_REGISTRY.get(node.type)

        dependencies = workflow.reverse_adjacency_list.get(node_id, [])

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

        # allow executor to return a dict with an "output" key or a raw value
        if isinstance(result, dict) and "output" in result:
            state[node.id] = result["output"]
        else:
            state[node.id] = result

    return state