import { useEffect, useState } from "react";
import Connection from "@/components/CustomEdges/Connection/Connection";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import NodeWrapper from "../NodeWrapper";

type OutputValue = {
  prompt: string;
  systemMessage: string;
  response: Array<{ content: string }>;
};

const OutputNode = ({ id }: { id: string }) => {
  const { setNodes } = useReactFlow();
  const [value, setValue] = useState<OutputValue>({
    prompt: "",
    systemMessage: "",
    response: [],
  });

  useEffect(() => {
    console.log("Updated value:", value);
  }, [value]);

  return (
    <NodeWrapper id={id} className="w-[220px]">
      <div className="text-sm font-semibold text-slate-900">Chat Output</div>
      <Handle type="target" position={Position.Left} id={"target"} />
    </NodeWrapper>
  );
};

export default OutputNode;
