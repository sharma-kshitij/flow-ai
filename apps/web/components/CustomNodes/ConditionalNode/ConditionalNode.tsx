import { useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Card } from "../../ui/card";

interface ConditionalNodeProps {
  id: string;
  data: any;
}

export default function ConditionalNode({ id, data }: ConditionalNodeProps) {
  const { setNodes } = useReactFlow();

  const [value, setValue] = useState(data?.value || "");

  const [label, setLabel] = useState(data?.label || "Condition");

  // sync to flow state
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                value,
                label,
              },
            }
          : node,
      ),
    );
  }, [value, label, id, setNodes]);

  return (
    <Card className="w-[260px] p-3">
      {/* Title */}
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="mb-2 w-full bg-transparent text-sm font-semibold outline-none"
      />

      {/* Value Input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Prompt"
        className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
      />

      {/* OUTPUT HANDLES */}
      <div className="mt-3 flex justify-between">
        {/* TRUE branch */}
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          style={{ top: 30 }}
        />

        {/* FALSE branch */}
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          style={{ top: 60 }}
        />

        {/* INPUT */}
        <Handle type="target" position={Position.Left} id="input" />
      </div>
    </Card>
  );
}
