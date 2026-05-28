from fastapi import FastAPI
from compiler.compiler import compile_workflow
from compiler.runner import run_workflow
from models.workflow import Workflow

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello from FastAPI"}

@app.post("/run")
async def run_worflows(workflow:Workflow):
    compiled = compile_workflow(workflow)
    result = await run_workflow(compiled)
    return result