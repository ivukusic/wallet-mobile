import React from "react";

import { AntDesign, Feather } from "@expo/vector-icons";

import { Container } from "./styles";
import { Props } from "./types";

export const BackButton = ({
  canGoBack,
  close,
  dark = false,
  onPress,
}: Props) => {
  if (!canGoBack) {
    return null;
  }
  if (close) {
    return (
      <Container onPress={onPress}>
        <AntDesign color={dark ? "#131A2E" : "white"} name="close" size={26} />
      </Container>
    );
  }
  return (
    <Container onPress={onPress}>
      <Feather color={dark ? "#131A2E" : "white"} name="x" size={26} />
    </Container>
  );
};
