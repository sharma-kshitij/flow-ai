import * as React from "react";
import { cn } from "./utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-white/95 p-3 shadow-2xl ring-1 ring-slate-200 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
