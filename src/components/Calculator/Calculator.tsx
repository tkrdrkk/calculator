import useCalculator from "@/hooks/useCalculator";
import { Formula, Operator, OperatorType } from "@/shared/types";
import { Button, Grid } from "@mantine/core";
import React from "react";

const StyledButton = ({
  value,
  onClick,
  color,
  type,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & React.CSSProperties) => (
  <Button
    value={value}
    onClick={onClick}
    color={color}
    style={{ width: 80, height: 64 }}
    type={type}
  >
    {value}
  </Button>
);

const NumberButton = ({
  value,
  onClick,
}: {
  value: number;
  onClick: () => void;
}) => <StyledButton value={value} onClick={onClick} />;

const OperatorButton = ({
  operator,
  onClick,
}: {
  operator: OperatorType;
  onClick: () => void;
}) => <StyledButton value={operator.view} onClick={onClick} color="orange" />;

const ResetButton = ({ onClick }: { onClick: () => void }) => (
  <StyledButton
    type="submit"
    value={Operator.reset.view}
    color="orange"
    onClick={onClick}
  />
);
const ExecuteButton = () => (
  <StyledButton type="submit" value={"="} color="yellow" />
);
type Numbers = (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)[];

const Row = ({
  numbers,
  operator,
  queueFormula,
  onClickNumber,
}: {
  numbers: Numbers;
  operator: OperatorType;
  queueFormula: () => void;
  onClickNumber: (value: number) => void;
}) => (
  <Grid>
    {numbers.map((n) => (
      <Grid.Col key={n.toString()} span={3}>
        <NumberButton
          value={n}
          onClick={() => {
            onClickNumber(n);
            console.log("ok?");
          }}
        />
      </Grid.Col>
    ))}
    {
      <Grid.Col span={3}>
        <OperatorButton operator={operator} onClick={queueFormula} />
      </Grid.Col>
    }
  </Grid>
);

const CalculatedWindow = ({ calculated }: { calculated: number }) => (
  <p
    style={{
      textAlign: "center",
      padding: 8,
      border: "grey 1px solid",
      cursor: "text",
    }}
  >
    {calculated}
  </p>
);

const FormulasWindow = ({ formulas }: { formulas: Formula[] }) => (
  <p
    style={{
      textAlign: "center",
      padding: 8,
      border: "grey 1px solid",
      cursor: "text",
    }}
  >
    {formulas.length > 0
      ? formulas.map((f) => `${f.type.view} ${f.operand}`).join(` `)
      : `input some formula.`}
  </p>
);

const rows: { numbers: Numbers; operator: OperatorType }[] = [
  { numbers: [7, 8, 9], operator: Operator.divide },
  { numbers: [4, 5, 6], operator: Operator.times },
  {
    numbers: [1, 2, 3],
    operator: Operator.minus,
  },
];

const Calculator = () => {
  const { calculated, calculate, formulas, reset } = useCalculator();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        calculate();
      }}
    >
      <CalculatedWindow calculated={calculated} />
      <FormulasWindow formulas={formulas.current} />
      <Grid>
        <Grid.Col span={3}>
          <ResetButton onClick={reset} />
        </Grid.Col>
      </Grid>
      {rows.map((r) => (
        <Row
          key={r.operator.type}
          numbers={r.numbers}
          operator={r.operator}
          queueFormula={() => formulas.queue.start(r.operator)}
          onClickNumber={formulas.queue.carry}
        />
      ))}
      <Grid>
        <Grid.Col span={3}>
          <NumberButton value={0} onClick={() => formulas.queue.carry(0)} />
        </Grid.Col>
        <Grid.Col span={3} offset={3}>
          <ExecuteButton />
        </Grid.Col>
        <Grid.Col span={3}>
          <OperatorButton
            operator={Operator.plus}
            onClick={() => formulas.queue.start(Operator.plus)}
          />
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default Calculator;
