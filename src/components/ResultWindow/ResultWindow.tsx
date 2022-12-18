import { Box } from "@mantine/core";

const ResultWindow = ({ value }: { value: string }) => (
  <Box style={{ border: "1px solid black" }}>{value}</Box>
);

export default ResultWindow;
