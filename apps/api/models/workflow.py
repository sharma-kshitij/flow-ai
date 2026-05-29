from pydantic import BaseModel
from typing import Dict, List, Any

class Node(BaseModel):
    id:str
    type:str
    data:Dict[str,Any]

class Edge(BaseModel):
    id:str
    source:str
    target:str
    sourceHandle: str | None = None

class Workflow(BaseModel):
    id:str
    nodes:List[Node]
    edges:List[Edge]

class CompiledWorkflow(BaseModel):
    id: str
    adjacency_list: Dict[str, List[Any]]  
    reverse_adjacency_list: Dict[str, List[str]]
    node_map: Dict[str, Any]
