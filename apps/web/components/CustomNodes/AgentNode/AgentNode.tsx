import { useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import NodeWrapper from "../NodeWrapper";

interface AgentNodeProps {
  id: string;
  data: any;
}

export default function AgentNode({ id, data }: AgentNodeProps) {
  const { setNodes } = useReactFlow();

  const [title, setTitle] = useState(data?.label || "Agent Node");
  const [systemMessage, setSystemMessage] = useState(
    data?.systemMessage || "You are a helpful assistant.",
  );

  const [editingTitle, setEditingTitle] = useState(false);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: title,
                systemMessage,
              },
            }
          : node,
      ),
    );
  }, [title, systemMessage, id, setNodes]);

  return (
    <NodeWrapper id={id} className="w-[260px] p-3">
      {editingTitle ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setEditingTitle(false)}
          autoFocus
          className="mb-2 w-full rounded-lg border border-[color:var(--border)] bg-transparent px-2 py-1 text-sm font-semibold text-[var(--text)] outline-none"
        />
      ) : (
        <div
          onClick={() => setEditingTitle(true)}
          className="mb-2 cursor-pointer text-sm font-semibold text-[var(--text)]"
        >
          {title}
        </div>
      )}

      <input
        type="text"
        value={systemMessage}
        onChange={(e) => setSystemMessage(e.target.value)}
        placeholder="System message..."
        className="w-full rounded-xl border border-[color:var(--border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--border)]"
      />

      {/* 🔗 Handles */}
      <div className="mt-3 flex justify-between gap-2">
        <Handle type="target" position={Position.Left} id="target" />
        <Handle type="source" position={Position.Right} id="source" />
      </div>
    </NodeWrapper>
  );
}
