from collections import defaultdict
from models.workflow import Edge

def build_adjacency_list(workflow):
    adjacency = defaultdict(list)
    reverse = defaultdict(list)

    for edge in workflow.edges:
        adjacency[edge.source].append(edge)
        reverse[edge.target].append(edge.source)

    return adjacency, reverse