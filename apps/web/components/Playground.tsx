import { useCallback, useEffect, useState } from "react";
import {
  Background,
  Connection,
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
import axios from "axios";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialNodes: any[] = [
  {
    id: "dndnode_1780032610029_Input",
    type: "Input",
    position: {
      x: 160.510129148661,
      y: 418.3769961214236,
    },
    data: {
      label: "Input node",
    },
    measured: {
      width: 220,
      height: 44,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056172189_Agent",
    type: "Agent",
    position: {
      x: 796.6928423367722,
      y: 293.9318651422844,
    },
    data: {
      label: "Tech node",
      systemMessage:
        "You are a stoic assistant. Be very serious and to the point. Refuse to participate in any time wasting activities.",
    },
    measured: {
      width: 260,
      height: 102,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056176028_Condition",
    type: "Condition",
    position: {
      x: 449.10743735149174,
      y: 389.22651808835474,
    },
    data: {
      label: "Condition node",
      condition: "contains",
      value: "Is the user in a very serious mood?",
    },
    measured: {
      width: 260,
      height: 104,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056179367_Agent",
    type: "Agent",
    position: {
      x: 805.8699561624439,
      y: 507.6902770710942,
    },
    data: {
      label: "Agent node",
      systemMessage: "You are a helpful, fun assistant.",
    },
    measured: {
      width: 260,
      height: 102,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056180402_Output",
    type: "Output",
    position: {
      x: 1131.308312420186,
      y: 322.16157572650457,
    },
    data: {
      label: "Output node",
    },
    measured: {
      width: 220,
      height: 44,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056181182_Output",
    type: "Output",
    position: {
      x: 1130.8932849865366,
      y: 537.8426965726861,
    },
    data: {
      label: "Output node",
    },
    measured: {
      width: 220,
      height: 44,
    },
    selected: false,
    dragging: false,
  },
];
const initialEdges = [
  {
    source: "dndnode_1780032610029_Input",
    sourceHandle: "source",
    target: "dndnode_1780056176028_Condition",
    targetHandle: "input",
    id: "xy-edge__dndnode_1780032610029_Inputsource-dndnode_1780056176028_Conditioninput",
  },
  {
    source: "dndnode_1780056176028_Condition",
    sourceHandle: "true",
    target: "dndnode_1780056172189_Agent",
    targetHandle: "target",
    id: "xy-edge__dndnode_1780056176028_Conditiontrue-dndnode_1780056172189_Agenttarget",
  },
  {
    source: "dndnode_1780056172189_Agent",
    sourceHandle: "source",
    target: "dndnode_1780056180402_Output",
    targetHandle: "target",
    id: "xy-edge__dndnode_1780056172189_Agentsource-dndnode_1780056180402_Outputtarget",
  },
  {
    source: "dndnode_1780056179367_Agent",
    sourceHandle: "source",
    target: "dndnode_1780056181182_Output",
    targetHandle: "target",
    id: "xy-edge__dndnode_1780056179367_Agentsource-dndnode_1780056181182_Outputtarget",
  },
  {
    source: "dndnode_1780056176028_Condition",
    sourceHandle: "false",
    target: "dndnode_1780056179367_Agent",
    targetHandle: "target",
    id: "xy-edge__dndnode_1780056176028_Conditionfalse-dndnode_1780056179367_Agenttarget",
  },
];

function DnDFlow() {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [dragType, setDragType] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [thinking, setThinking] = useState(false);

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

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userInput = inputValue;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: userInput,
        timestamp: "",
      },
    ]);
    setInputValue("");

    const workflow = {
      id: "workflow_1",
      nodes: nodes.map((nde) => {
        if (nde.type === "Input")
          return {
            id: nde.id,
            type: nde.type,
            data: { ...nde.data, chatInput: userInput },
          };
        else {
          return {
            id: nde.id,
            type: nde.type,
            data: nde.data,
          };
        }
      }),
      edges: edges.map((edge) => {
        return {
          id: edge.id,
          source: edge?.source,
          target: edge?.target,
          sourceHandle: edge?.sourceHandle,
        };
      }),
    };

    setThinking(true);
    try {
      // console.log("Worflow: ", workflow);
      const res = await axios.post("/api/llmCall", { workflow });
      // console.log("Compiled Workflow: ", res.data);
      console.log(nodes);
      console.log(edges);
      console.log("Result: ", res.data);

      for (const [key, value] of Object.entries(res.data)) {
        if (key.endsWith("Agent")) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              role: "assistant",
              content: String(value),
              timestamp: "",
            },
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper relative">
        <div
          onBlur={() => setIsPanelOpen(false)}
          className="fixed top-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-auto"
        >
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
                  {messages.map((msg, ind) => (
                    <div
                      key={ind}
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
                  {thinking && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-white text-slate-500 shadow-sm rounded-bl-none flex items-center gap-2">
                        <span className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                        </span>
                        <span className="ml-2">Thinking...</span>
                      </div>
                    </div>
                  )}
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
                    placeholder="What is 2+2?"
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
