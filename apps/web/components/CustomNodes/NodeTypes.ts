import AgentNode from "./AgentNode/AgentNode";
import ConditionalNode from "./ConditionalNode/ConditionalNode";
import InputNode from "./InputNode/InputNode";
import OutputNode from "./OutputNode/OutputNode";

export const nodeTypes={
    Input:InputNode,
    Agent:AgentNode,
    Output:OutputNode,
    Condition:ConditionalNode
}