from .executors import inputExecutor,agentExecutor,outputExecutor

NODE_REGISTRY  = {
    "Input" : inputExecutor,
    "Agent" : agentExecutor,
    "Output" : outputExecutor
} 