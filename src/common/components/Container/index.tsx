import React from "react";

import { ViewContainer } from "./styles";
import { ContainerProps } from "./types";

export const Container: React.FC<ContainerProps> = ({ children, ...rest }) => (
  <ViewContainer {...rest}>{children}</ViewContainer>
);
