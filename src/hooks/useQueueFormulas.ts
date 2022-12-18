import { Formula } from "@/shared/types";
import { useReducer } from "react";

export const useQueueFormulas = () => {
  const handleFormula = (
    prev: Formula[],
    action: { type: "reset" | "queue"; newFormula?: Formula }
  ): Formula[] => {
    switch (action.type) {
      case "queue":
        return action.newFormula
          ? [...prev, { ...action.newFormula }]
          : [...prev];
      case "reset":
        return [];
      default:
        const _unreachable: never = action.type;
        break;
    }
    return [];
  };
  const [formulas, handleFormulas] = useReducer(handleFormula, []);

  // TODO
  const queueFormula = (newFormula: Formula) => {
    handleFormulas({ type: "queue", newFormula });
  };

  // TODO
  const resetFormulas = () => {
    handleFormulas({ type: "reset" });
  };

  return {
    formulas,
    queueFormula,
    resetFormulas,
  };
};
