import { Formula, OperatorType } from "@/shared/types";
import { useReducer } from "react";

type HandleFormulaAction =
  | { type: "init"; operator: OperatorType }
  | { type: "carry"; operand: number }
  | { type: "lowering" }
  | { type: "release" };
export const useEditFormula = () => {
  const handleFormula = (
    prev: Formula | undefined,
    action: HandleFormulaAction
  ): Formula | undefined => {
    switch (action.type) {
      case "init":
        return { type: action.operator, operand: 0 };
      case "carry":
        return (
          prev && {
            type: prev?.type,
            operand: prev.operand * 10 + action.operand,
          }
        );
      case "lowering":
        return (
          prev && { type: prev?.type, operand: Math.floor(prev.operand / 10) }
        );
      case "release":
        return undefined;
      default:
        const _unreachable: never = action;
    }
    return undefined;
  };
  const [formula, dispatch] = useReducer(handleFormula, undefined);

  const init = (operator: OperatorType) => dispatch({ type: "init", operator });

  const carry = (operand: number) => dispatch({ type: "carry", operand });
  const lowering = () => dispatch({ type: "lowering" });
  const release = () => dispatch({ type: "release" });

  console.log("released?", formula);

  return {
    formula,
    init,
    carry,
    lowering,
    release,
  };
};
