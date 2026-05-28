# Flow AI

Flow AI is a visual workflow engine for building and executing AI-powered pipelines. It allows users to construct node-based workflows (like Input → Agent → Output) and execute them in a structured, deterministic order using a compiled execution graph.

---

## Features

- Node-based workflow builder
- Input Node (user input ingestion)
- Agent Node (LLM execution)
- Output Node (result propagation)
- Conditional Node (branching logic)
- Directed acyclic graph (DAG) execution model
- Workflow compiler with:
  - Adjacency list generation
  - Topological sorting for execution order
- Workflow runner with shared execution context
- Extensible node registry system
- Full-stack architecture (Next.js + Python FastAPI backend)

---

## Architecture Overview

Flow AI is split into two main parts:

### 1. Frontend (Next.js)

- Visual workflow builder UI
- Node creation and connection system
- Sends workflow graph to backend for compilation/execution

### 2. Backend (Python FastAPI / Node runtime logic)

- Compiles workflow into executable graph
- Performs topological sort of nodes
- Executes nodes sequentially using a shared context object

---

## 🔄 Workflow Execution Model

1. User builds a workflow graph
2. Backend receives workflow definition
3. Compiler generates:
   - Adjacency list
   - Reverse adjacency (dependency map)
4. Topological sort determines execution order
5. Workflow Runner executes nodes sequentially
6. Each node reads/writes from a shared context

---

## Node System

Each node follows a standard interface:

```ts
type Node = {
  id: string;
  type: "input" | "agent" | "output" | "conditional";
  data: Record<string, any>;
};
```

## Roadmap

Planned features and improvements for Flow AI:

- [ ] Conditional Nodes  
       Add branching logic to workflows based on dynamic conditions and context evaluation.

- [ ] Built-in Chat Interface  
       Integrate a chat UI to allow users to interact with workflows and agents in real time.

- [ ] Tool Support  
       Allow Agent Nodes to call external tools (APIs, functions, or plugins) to extend capabilities beyond LLM responses.
