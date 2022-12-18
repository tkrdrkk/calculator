import { PropsWithChildren } from "react";
import Mantine from "./mantine/Mantine";

const ProviderRoot = ({ children }: PropsWithChildren) => {
  return <Mantine>{children}</Mantine>;
};

export default ProviderRoot;
