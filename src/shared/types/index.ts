const operators = [
  { view: "+", type: "plus" },
  { view: "-", type: "minus" },
  { view: "x", type: "times" },
  {
    view: "/",
    type: "divide",
  },
  { view: "C", type: "reset" },
] as const;
export type OperatorType = typeof operators[number];
export const Operator = {
  plus: operators[0],
  minus: operators[1],
  times: operators[2],
  divide: operators[3],
  reset: operators[4],
} as const;

export type Formula = {
  type: OperatorType;
  operand: number;
};
