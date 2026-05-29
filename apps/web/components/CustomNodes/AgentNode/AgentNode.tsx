import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import Connection from "@/components/CustomEdges/Connection/Connection";
import { Card } from "../../ui/card";

interface AgentNodeProps {
  id: string;
  data: any;
}

export default function AgentNode({ id, data }: AgentNodeProps) {
  const [systemMessage, setSystemMessage] = useState(
    "You are a helpful assistant.",
  );

  const [prompt, setPrompt] = useState("Hi");

  return (
    <Card className="w-[260px]">
      <div className="mb-2 text-sm font-semibold text-[var(--text)]">
        Agent Node
      </div>
      <input
        type="text"
        value={systemMessage}
        onChange={(e) => setSystemMessage(e.target.value)}
        className="w-full rounded-xl border border-[color:var(--border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[color:var(--text)] focus:ring-2 focus:ring-[color:var(--border)]"
      />
      <div className="mt-3 flex justify-between gap-2">
        <Handle type="target" position={Position.Left} id={"target"} />
        <Handle type="source" position={Position.Right} id={"source"} />
      </div>
    </Card>
  );
}
