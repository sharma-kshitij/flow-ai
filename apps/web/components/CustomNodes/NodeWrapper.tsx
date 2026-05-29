import { ReactNode } from "react";
import { useReactFlow } from "@xyflow/react";
import { Card } from "../ui/card";

interface NodeWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export default function NodeWrapper({
  id,
  className,
  children,
}: NodeWrapperProps) {
  const { setNodes } = useReactFlow();

  const handleDelete = () => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  return (
    <Card className={`${className ?? ""} relative border border-black`}>
      <button
        type="button"
        onClick={handleDelete}
        className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-black bg-slate-100 text-slate-600 transition hover:bg-slate-200"
        aria-label="Delete node"
      >
        <span className="text-xs font-semibold">×</span>
      </button>
      {children}
    </Card>
  );
}
