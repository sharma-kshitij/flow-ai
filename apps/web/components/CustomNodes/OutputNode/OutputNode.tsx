import { useEffect, useState } from "react";
import Connection from "@/components/CustomEdges/Connection/Connection";
import { Handle, Position } from "@xyflow/react";
import { Card } from "../../ui/card";

type OutputValue = {
  prompt: string;
  systemMessage: string;
  response: Array<{ content: string }>;
};

const OutputNode = () => {
  const [value, setValue] = useState<OutputValue>({
    prompt: "",
    systemMessage: "",
    response: [],
  });

  useEffect(() => {
    console.log("Updated value:", value);
  }, [value]);

  return (
    <Card className="w-[220px]">
      <div className="text-sm font-semibold text-slate-900">Chat Output</div>
      <Handle type="target" position={Position.Left} id={"target"} />
    </Card>
  );
};

export default OutputNode;
