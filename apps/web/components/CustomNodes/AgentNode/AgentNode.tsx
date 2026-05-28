import { useCallback, useMemo, useState } from "react";
import styles from "./AgentNode.module.scss";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import Connection from "@/components/CustomEdges/Connection/Connection";
import axios from "axios";

interface AgentNodeProps {
  id: string;
  data: any;
}

export default function AgentNode({ id, data }: AgentNodeProps) {
  const [systemMessage, setSystemMessage] = useState(
    "You are a helpful assistant.",
  );

  const [prompt, setPrompt] = useState("Hi");

  const { getNodes,getEdges } = useReactFlow();

  const messages = useMemo(
    () => [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    [systemMessage, prompt],
  );
 

  const handleTrigger = useCallback(async () => {

    const nodes = getNodes().map((nde)=>{
      return {
        id:nde.id,
        type:nde.type,
        data:nde.data
      }
    })

    const edges = getEdges().map((edge)=>{
      return {
        id:edge.id,
        source:edge.source,
        target:edge.target
      }
    })

    const workflow = {
      id:"workflow_1",
      nodes:nodes,
      edges:edges
    }
    console.log("Worflow: ", workflow)
    const res = await axios.post('/api/llmCall',{workflow})
    console.log("Compiled Workflow: ",res.data)
  }, [messages, id]);

  return (
    <div className={styles.container}>
      <div>
        <div>Agent Node</div>

        <input
          type="text"
          value={systemMessage}
          onChange={(e) => setSystemMessage(e.target.value)}
        />

        <button onClick={handleTrigger}>Trigger</button>

        <Connection
          id="target"
          label={"Testing"}
          onChange={(c) => setPrompt(c)}
          defaultValue={prompt}
        />

        <Handle type="source" position={Position.Right} id={"source"} />
      </div>
    </div>
  );
}
