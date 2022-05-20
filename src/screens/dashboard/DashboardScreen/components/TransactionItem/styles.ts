import { Dimensions } from "react-native";

import styled from "styled-components/native";

import { Colors } from "~/themes";

const { height } = Dimensions.get("screen");

export const FlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    minHeight: height - 200,
  },
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding-top: 200px;
  width: 100%;
`;
