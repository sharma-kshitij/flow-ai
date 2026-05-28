def inputExecutor(ctx):
    return {"output":"Input Node Output"}

def agentExecutor(ctx):
    llmResponse = "Hi, how may I assist you today?"
    
    output = ctx['input'] + " " + llmResponse
    
    return {"output":output}

def outputExecutor(ctx):
    return {"output":"Output Node Output"}
