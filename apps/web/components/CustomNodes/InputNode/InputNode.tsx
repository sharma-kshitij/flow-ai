import { Handle, Position, useReactFlow } from "@xyflow/react";
import styles from "./InputNode.module.scss";

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
    <div className={styles.container}>
      <div>Input Node</div>
      <input
        type="text"
        onChange={(e) => updateNodeData(id, e.target.value)}
        style={{ width: "150px" }}
      />
      <Handle type="source" position={Position.Right} id={"source"} />
    </div>
  );
};

export default InputNode;
