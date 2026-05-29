export const initialNodes: any[] = [
  {
    id: "dndnode_1780032610029_Input",
    type: "Input",
    position: {
      x: 160.510129148661,
      y: 418.3769961214236,
    },
    data: {
      label: "Input node",
    },
    measured: {
      width: 220,
      height: 44,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056172189_Agent",
    type: "Agent",
    position: {
      x: 796.6928423367722,
      y: 293.9318651422844,
    },
    data: {
      label: "Stoic Assistant",
      systemMessage:
        "You are a stoic assistant. Be very serious and to the point. Refuse to participate in any time wasting activities.",
    },
    measured: {
      width: 260,
      height: 102,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056176028_Condition",
    type: "Condition",
    position: {
      x: 449.10743735149174,
      y: 389.22651808835474,
    },
    data: {
      label: "Condition node",
      condition: "contains",
      value: "Is the user in a very serious mood?",
    },
    measured: {
      width: 260,
      height: 104,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056179367_Agent",
    type: "Agent",
    position: {
      x: 805.8699561624439,
      y: 507.6902770710942,
    },
    data: {
      label: "Fun assistant",
      systemMessage: "You are a helpful, fun assistant.",
    },
    measured: {
      width: 260,
      height: 102,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056180402_Output",
    type: "Output",
    position: {
      x: 1131.308312420186,
      y: 322.16157572650457,
    },
    data: {
      label: "Output node",
    },
    measured: {
      width: 220,
      height: 44,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "dndnode_1780056181182_Output",
    type: "Output",
    position: {
      x: 1130.8932849865366,
      y: 537.8426965726861,
    },
    data: {
      label: "Output node",
    },
    measured: {
      width: 220,
      height: 44,
    },
    selected: false,
    dragging: false,
  },
];


export const initialEdges = [
  {
    source: "dndnode_1780032610029_Input",
    sourceHandle: "source",
    target: "dndnode_1780056176028_Condition",
    targetHandle: "input",
    id: "xy-edge__dndnode_1780032610029_Inputsource-dndnode_1780056176028_Conditioninput",
  },
  {
    source: "dndnode_1780056176028_Condition",
    sourceHandle: "true",
    target: "dndnode_1780056172189_Agent",
    targetHandle: "target",
    id: "xy-edge__dndnode_1780056176028_Conditiontrue-dndnode_1780056172189_Agenttarget",
  },
  {
    source: "dndnode_1780056172189_Agent",
    sourceHandle: "source",
    target: "dndnode_1780056180402_Output",
    targetHandle: "target",
    id: "xy-edge__dndnode_1780056172189_Agentsource-dndnode_1780056180402_Outputtarget",
  },
  {
    source: "dndnode_1780056179367_Agent",
    sourceHandle: "source",
    target: "dndnode_1780056181182_Output",
    targetHandle: "target",
    id: "xy-edge__dndnode_1780056179367_Agentsource-dndnode_1780056181182_Outputtarget",
  },
  {
    source: "dndnode_1780056176028_Condition",
    sourceHandle: "false",
    target: "dndnode_1780056179367_Agent",
    targetHandle: "target",
    id: "xy-edge__dndnode_1780056176028_Conditionfalse-dndnode_1780056179367_Agenttarget",
  },
];
