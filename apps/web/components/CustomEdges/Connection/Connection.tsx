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

function Connection({
  id,
  type,
  position,
  style,
}: {
  id: string;
  type: string;
  position: any;
  style: any;
}) {
  return (
    <div>
      <Handle
        type="target"
        position={position}
        className="handle"
        id={id}
        style={style}
      />
    </div>
  );
}

export default Connection;
