import { Operator, OperatorType } from "@/shared/types";
import { useMemo, useReducer } from "react";
import { useEditFormula } from "./useEditFormula";
import { useQueueFormulas } from "./useQueueFormulas";

type CalculateAction = { type: OperatorType; operand: number };

const useCalculator = () => {
  const handleCalculate = (prev: number, action: CalculateAction) => {
    console.log("dispatch!", action);
    // HACK
    switch (action.type.type) {
      case "plus":
        return prev + action.operand;
      case "minus":
        return prev - action.operand;
      case "divide":
        return prev / action.operand;
      case "times":
        return prev * action.operand;
      case "reset":
        return 0;
      default:
        const _unreachable: never = action.type;
        break;
    }
    return 0;
  };
  const [calculated, dispatch] = useReducer(handleCalculate, 0);

  const { formula, init, carry, lowering, release } = useEditFormula();

  const {
    formulas: queuedFormulas,
    queueFormula: queue,
    resetFormulas,
  } = useQueueFormulas();

  const calculate = () => {
    formulas.forEach((f) => {
      console.log(f);
      dispatch(f);
    });
    release();
    resetFormulas();
  };

  const formulas = useMemo(() => {
    console.log(queuedFormulas, formula);
    return formula ? [...queuedFormulas, { ...formula }] : [...queuedFormulas];
  }, [queuedFormulas, formula]);

  const startQueueing = (operator: OperatorType) => {
    if (formula) {
      queue({ ...formula });
      release();
    }

    init(operator);
  };

  const reset = () => {
    dispatch({ type: Operator.reset, operand: 0 });
    release();
    resetFormulas();
  };

  console.log(formulas);
  return {
    calculated,
    calculate,
    formulas: {
      current: formulas,
      queue: {
        start: startQueueing,
        carry,
        lowering,
      },
    },
    reset,
  };
};

export default useCalculator;
