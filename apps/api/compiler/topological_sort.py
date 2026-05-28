from collections import deque


def topological_sort(
    nodes,
    adjacency
):

    indegree = {}
    for node in nodes:
        indegree[node.id]=0

    for source in adjacency:

        for target in adjacency[source]:

            indegree[target] += 1

    queue = deque()

    for node_id in indegree:

        if indegree[node_id] == 0:
            queue.append(node_id)

    result = []

    while queue:

        current = queue.popleft()

        result.append(current)

        for neighbor in adjacency[current]:

            indegree[neighbor] -= 1

            if indegree[neighbor] == 0:
                queue.append(neighbor)

    if len(result) != len(nodes):

        raise Exception(
            "Workflow contains cycle"
        )

    return result