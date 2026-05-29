# Flow AI

Flow AI is a visual workflow builder for creating and running simple AI pipelines.

You can connect nodes like **Input → Agent → Output** and run them as a graph. I created it as a learning project to explore how workflow engines and LLM calls can work together.

---

## Installation Instructions:

Make sure you have Python and Node installed.

1.  Clone the Project
2.  Run `npm run install:all` in root directory
3.  Run `npm run dev` in root directory
4.  Add an `.env.local` file inside root/apps/web with the following:
    `BACKEND_BASE_URL = "http://localhost:8000" `
5.  Add an `.env.local` file inside root/apps/api with the following:
    `OPENAI_API_KEY="<Your API key here>"`

## Features

- Visual node-based workflow builder (React Flow)
- Drag and connect nodes to build workflows
- Input, Agent, Output, and Conditional nodes
- True/False branching with conditional nodes
- DAG-based execution system
- Shared state between nodes
- Async support for LLM calls
- Extensible node system using a registry

---

## How it works

1. You create a workflow in the UI using nodes and connections
2. The frontend sends the workflow structure to the backend
3. The backend converts it into a graph (dependencies between nodes)
4. Nodes with no dependencies run first
5. Each node runs and stores its output
6. The next nodes run when their inputs are ready
7. This continues until the workflow finishes

---

## Node types

### Input node

Starts the workflow and takes user input.

### Agent node

Calls an LLM and returns a response based on the input.

### Conditional node

Checks a condition and returns `true` or `false`.

Used to route the workflow into different paths.

### Output node

Shows the final result of the workflow.

---

## Edge system

Edges define how nodes are connected.

- Normal edges pass data forward
- Conditional nodes use:
  - `true`
  - `false`

Only the matching branch runs.

Example:

```
Input
↓
Conditional
├── true → Agent A
└── false → Agent B
```

---

## Execution model

Flow AI uses a simple DAG execution approach:

- Nodes without dependencies run first
- When a node finishes, it unlocks the next nodes
- Execution continues until all reachable nodes are done

Each node gets a shared context object:

```python
ctx = {
  "nodeId": "node_1",
  "workflowId": "workflow_1",
  "input": "value from previous node",
  "config": {},
  "state": {}
}
```
