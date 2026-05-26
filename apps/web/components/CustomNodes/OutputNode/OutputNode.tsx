import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import styles from "./OutputNode.module.scss";
import { useEffect, useState } from "react";
import Connection from "@/components/CustomEdges/Connection/Connection";

const OutputNode = () => {
  const [value, setValue] = useState({
    prompt: "",
    systemMessage: "",
    response: "",
  });

  useEffect(() => {
    console.log("Updated value:", value);
  }, [value]);

  return (
    <div className={styles.container}>
      <div>
        Output:
        {` ${value?.response?.[value?.response?.length - 1]?.content}`}
      </div>
      <Connection
        id="target"
        label={"Testing"}
        onChange={(c) => setValue(c)}
        defaultValue="Output"
      />
    </div>
  );
};

export default OutputNode;
