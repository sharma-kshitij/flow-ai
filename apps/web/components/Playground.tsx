import { useCallback, useEffect, useState } from "react";
import {
  Background,
  Connection,
  Edge,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { DnDProvider, useDnD, useDnDPosition } from "./useDnD";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { nodeTypes } from "./CustomNodes/NodeTypes";
import { messages } from "./TestMessages";
import axios from "axios";

const initialNodes: any[] = [];

function DnDFlow() {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [inputValue, setInputValue] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [dragType, setDragType] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("flow-ai-theme") as
      | "dark"
      | "light"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${theme}`);
    window.localStorage.setItem("flow-ai-theme", theme);
  }, [theme]);

  const { onDragStart, isDragging } = useDnD();
  const { setNodes, zoomIn, zoomOut, fitView } = useReactFlow();

  const createAddNewNode = useCallback(
    (nodeType: string) => {
      return ({ position }: { position: { x: number; y: number } }) => {
        const newNode = {
          id: `dndnode_${Date.now()}_${nodeType}`,
          type: nodeType,
          position,
          data: { label: `${nodeType} node` },
        };

        setNodes((nds) => nds.concat(newNode));
        setDragType(null);
      };
    },
    [setNodes],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const [isChatOpen, setIsChatOpen] = useState(false);

  // const handleTrigger = useCallback(async () => {
  //   const nodes = nodes().map((nde) => {
  //     return {
  //       id: nde.id,
  //       type: nde.type,
  //       data: nde.data,
  //     };
  //   });

  //   const edges = edges().map((edge) => {
  //     return {
  //       id: edge.id,
  //       source: edge.source,
  //       target: edge.target,
  //     };
  //   });

  //   const workflow = {
  //     id: "workflow_1",
  //     nodes: nodes,
  //     edges: edges,
  //   };
  //   console.log("Worflow: ", workflow);
  //   const res = await axios.post("/api/llmCall", { workflow });
  //   console.log("Compiled Workflow: ", res.data);
  // }, []);

  const handleTrigger = async () => {
    const workflow = {
      id: "workflow_1",
      nodes: nodes.map((nde) => {
        return {
          id: nde.id,
          type: nde.type,
          data: nde.data,
        };
      }),
      edges: edges.map((edge) => {
        return {
          id: edge.id,
          source: edge?.source,
          target: edge?.target,
        };
      }),
    };
    console.log("Worflow: ", workflow);
    const res = await axios.post("/api/llmCall", { workflow });
    console.log("Compiled Workflow: ", res.data);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setInputValue("");

    const workflow = {
      id: "workflow_1",
      nodes: nodes.map((nde) => {
        return {
          id: nde.id,
          type: nde.type,
          data: nde.data,
        };
      }),
      edges: edges.map((edge) => {
        return {
          id: edge.id,
          source: edge?.source,
          target: edge?.target,
        };
      }),
    };
    console.log("Worflow: ", workflow);
    const res = await axios.post("/api/llmCall", { workflow });
    console.log("Compiled Workflow: ", res.data);
  };

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper relative">
        <div className="fixed top-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 rounded-full bg-[var(--panel)] px-3 py-2 shadow-2xl ring-1 ring-[color:var(--border)] backdrop-blur-sm text-[var(--text)]">
            <Button onClick={() => setIsPanelOpen((open) => !open)}>
              Add Nodes
            </Button>
            <Button variant="secondary" size="icon" onClick={() => zoomIn()}>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </Button>
            <Button variant="secondary" size="icon" onClick={() => zoomOut()}>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </Button>
            <Button variant="secondary" size="icon" onClick={() => fitView()}>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 7V4h3" />
                <path d="M20 7V4h-3" />
                <path d="M4 17v3h3" />
                <path d="M20 17v3h-3" />
                <rect x="8" y="8" width="8" height="8" rx="1" />
              </svg>
            </Button>
            <Button
              variant="default"
              className="inline-flex items-center gap-2"
              onClick={() => setIsChatOpen((open) => !open)}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
              Run
            </Button>
          </div>

          {isPanelOpen && (
            <Card className="w-[320px] rounded-3xl">
              <div className="px-3 pb-2 text-xs text-[var(--muted)]">
                Drag a node onto the canvas to add it.
              </div>
              <div className="grid gap-3">
                {Object.keys(nodeTypes).map((key) => (
                  <div
                    key={key}
                    className="cursor-grab rounded-md border border-[color:var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm"
                    onPointerDown={(event) => {
                      setDragType(key);
                      onDragStart(event, createAddNewNode(key));
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-semibold text-[var(--text)]">
                        {`${key.charAt(0).toUpperCase() + key.slice(1)} Node`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* <button
                type="button"
                onClick={handleTrigger}
                className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[var(--panel)] px-3 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--card)]"
              >
                Trigger
              </button> */}
            </Card>
          )}
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>

      <div className="fixed inset-0 z-50 pointer-events-none">
        {isChatOpen && (
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={() => setIsChatOpen(false)}
          />
        )}

        {isChatOpen && (
          <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-auto">
            <div className="relative z-10 flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl text-slate-900 border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <span className="text-lg font-semibold text-slate-900">
                  Chat
                </span>
                <button
                  className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                  onClick={() => setIsChatOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 text-sm shadow-sm ${
                          msg.role === "user"
                            ? "bg-sky-600 text-white rounded-br-none"
                            : "bg-white text-slate-900 rounded-bl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-200 px-6 py-4 bg-white">
                <div className="flex items-center gap-3">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow transition hover:bg-slate-800"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isDragging && <DragGhost type={dragType} />}
    </div>
  );
}

function DragGhost({ type }: { type: string | null }) {
  const { position } = useDnDPosition();

  if (!position) return null;

  return (
    <div
      className={`dndnode ghostnode ${type}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      {type && `${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
