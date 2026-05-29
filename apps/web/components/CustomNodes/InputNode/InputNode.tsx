import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Card } from "../../ui/card";

const InputNode = ({ id }: { id: string }) => {
  const { setNodes } = useReactFlow();
  const updateNodeData = (id: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              value: newData,
            },
          };
        }
        return node;
      }),
    );
  };

  return (
    <Card className="w-[220px]">
      <div className="text-sm font-semibold text-slate-900">Chat Input</div>
      <Handle type="source" position={Position.Right} id={"source"} />
    </Card>
  );
};

export default InputNode;
