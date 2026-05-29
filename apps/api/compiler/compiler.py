from compiler.graph import (
    build_adjacency_list
)

from compiler.topological_sort import (
    topological_sort
)

from models.workflow import (
    CompiledWorkflow
)


def compile_workflow(workflow):

    adjacency, reverse = build_adjacency_list(workflow)

  
    node_map = {node.id: node for node in workflow.nodes}
    
    
    return CompiledWorkflow(
        id=workflow.id,
        adjacency_list=adjacency,
        reverse_adjacency_list=reverse,
        node_map=node_map
    )