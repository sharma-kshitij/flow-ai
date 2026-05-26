import { useReactFlow, XYPosition } from "@xyflow/react";
import { useCallback, useState } from "react";
import { OnDropAction, useDnD, useDnDPosition } from "./useDnD";
import { nodeTypes } from "./CustomNodes/NodeTypes";

// This is a simple ID generator for the nodes.
// You can customize this to use your own ID generation logic.
let id = 0;
const getId = () => `dndnode_${id++}`;

export function Sidebar() {
  const { onDragStart, isDragging } = useDnD();
  // The type of the node that is being dragged.
  const [type, setType] = useState<string | null>(null);

  const { setNodes } = useReactFlow();

  const createAddNewNode = useCallback(
    (nodeType: string): OnDropAction => {
      return ({ position }: { position: XYPosition }) => {
        // Here, we create a new node and add it to the flow.
        // You can customize the behavior of what happens when a node is dropped on the flow here.
        const newNode = {
          id: getId(),
          type: nodeType,
          position,
          data: { label: `${nodeType} node` },
        };

        setNodes((nds) => nds.concat(newNode));
        setType(null);
      };
    },
    [setNodes, setType],
  );

  return (
    <>
      {/* The ghost node will be rendered at pointer position when dragging. */}
      {isDragging && <DragGhost type={type} />}
      <aside>
        <div className="description">
          You can drag these nodes to the pane to create new nodes.
        </div>
        {nodeTypes &&
          Object.keys(nodeTypes).map((key) => (
            <div
              key={key}
              className={`dndnode ${key.toLowerCase()}`}
              onPointerDown={(event) => {
                setType(key);
                onDragStart(event, createAddNewNode(key));
              }}
            >
              {`${key.charAt(0).toUpperCase() + key.slice(1)} Node`}
            </div>
          ))}
        {/* <div
          className="dndnode output"
          onPointerDown={(event) => {
            setType("AgentNode");
            onDragStart(event, createAddNewNode("AgentNode"));
          }}
        >
          Agent Node
        </div>
        <div
          className="dndnode output"
          onPointerDown={(event) => {
            setType("OutputNode");
            onDragStart(event, createAddNewNode("OutputNode"));
          }}
        >
          Output Node
        </div> */}
      </aside>
    </>
  );
}

interface DragGhostProps {
  type: string | null;
}

// The DragGhost component is used to display a ghost node when dragging a node into the flow.
export function DragGhost({ type }: DragGhostProps) {
  const { position } = useDnDPosition();

  if (!position) return null;

  return (
    <div
      className={`dndnode ghostnode ${type}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      {type && `${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
    </div>
  );
}
