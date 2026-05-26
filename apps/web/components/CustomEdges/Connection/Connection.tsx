import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { useEffect } from "react";

interface CustomHandleProps {
  id: string;
  label: string;
  onChange: (value: any) => void;
  defaultValue: string;
}

function Connection({ id, label, onChange, defaultValue }: CustomHandleProps) {
  const connections = useNodeConnections({
    handleType: "target",
    handleId: id,
  });

  const nodeData = useNodesData(connections?.[0]?.source);

  useEffect(() => {
    onChange(nodeData?.data ? nodeData.data.value : defaultValue);
  }, [nodeData, defaultValue]);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        className="handle"
      />
    </div>
  );
}

export default Connection;
