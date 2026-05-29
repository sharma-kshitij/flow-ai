from .executors import inputExecutor,agentExecutor,outputExecutor, conditionalExecutor

NODE_REGISTRY  = {
    "Input" : inputExecutor,
    "Agent" : agentExecutor,
    "Output" : outputExecutor,
    "Condition": conditionalExecutor
} 