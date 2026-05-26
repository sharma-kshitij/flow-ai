import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import styles from "./OutputNode.module.scss";
import { useEffect, useState } from "react";
import Connection from "@/components/CustomEdges/Connection/Connection";

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
