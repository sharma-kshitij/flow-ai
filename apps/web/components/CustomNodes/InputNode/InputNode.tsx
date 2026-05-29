import { Handle, Position, useReactFlow } from "@xyflow/react";
import NodeWrapper from "../NodeWrapper";

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
    <NodeWrapper id={id} className="w-[220px]">
      <div className="text-sm font-semibold text-slate-900">Chat Input</div>
      <Handle type="source" position={Position.Right} id={"source"} />
    </NodeWrapper>
  );
};

export default InputNode;
