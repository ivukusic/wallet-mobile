import styled from "styled-components/native";

import { Colors } from "~/themes";
import { IAnyType } from "~/types";

import { CustomText } from "../CustomText";
import { TouchableOpacity } from "../TouchableOpacity";

const style: IAnyType = {
  default: {
    borderColor: Colors.border,
    wrapperBorderColor: `transparent`,
    color: Colors.black,
  },
  error: {
    borderColor: Colors.red,
    wrapperBorderColor: `${Colors.red}44`,
    color: Colors.red,
  },
  focused: {
    borderColor: Colors.primary,
    wrapperBorderColor: `${Colors.primary}44`,
    color: Colors.primary,
  },
};

export const Field = styled.View`
  margin-bottom: 10px;
  width: 100%;
  position: relative;
`;

export const Label = styled(CustomText).attrs({
  type: "caption",
  fontWeight: "semiBold",
})<{ state: string }>`
  text-align: left;
  position: absolute;
  top: 4px;
  left: 10px;
  background-color: #fbfbfb;
  padding: 3px;
  z-index: 1;
  color: ${({ state }) => style[state]?.color};
`;

export const ElementWrapper = styled.View<{ state: string }>`
  width: 100%;
  margin-top: 15px;
  border-radius: 7px;
  border-width: 3px;
  border-color: ${({ state }) => style[state]?.wrapperBorderColor};
`;

export const Element = styled.TextInput<{
  error: string;
  state: string;
  textarea: boolean;
}>`
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ state }) => style[state]?.borderColor};
  padding: 10px;
  width: 100%;
  height: ${({ textarea }) => (textarea ? "140px" : "52px")};
  background-color: #fbfbfb;
`;

export const ErrorMessage = styled(CustomText)`
  margin-left: 11px;
  font-size: 12px;
  color: ${Colors.red};
`;

export const ToggleShowPassword = styled(TouchableOpacity)`
  position: absolute;
  top: 26%;
  right: 17px;
  margin: auto;
`;
