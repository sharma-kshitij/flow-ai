def build_adjacency_list(workflow):

    adjacency = {}
    reverse = {}

    for node in workflow.nodes:

        adjacency[node.id] = []
        reverse[node.id] = []

    for edge in workflow.edges:

        adjacency[edge.source].append(
            edge.target
        )

        reverse[edge.target].append(
            edge.source
        )

    return adjacency, reverse