import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

const Mantine = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
};

export default Mantine;
