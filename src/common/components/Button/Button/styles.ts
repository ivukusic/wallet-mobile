import { ActivityIndicator } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import {
  backgroundColor,
  border,
  compose,
  flexbox,
  height,
  layout,
  space,
} from "styled-system";

import { CustomText } from "~/components/CustomText";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { Colors } from "~/themes";
import { IAnyType } from "~/types";
import { TypeScale } from "~/components/CustomText/types";

const style: IAnyType = {
  default: {
    borderColor: Colors.border,
    borderWidth: "1px",
    color: Colors.black,
  },
  primary: {
    borderColor: "transparent",
    borderWidth: 0,
    color: Colors.white,
  },
  list: {
    borderColor: "transparent",
    borderWidth: 0,
    color: Colors.black,
    Wrapper: {
      "justify-content": "flex-start",
    },
  },
  delete: {
    borderColor: "transparent",
    borderWidth: 0,
    color: Colors.white,
  },
};

export const Wrapper = styled(TouchableOpacity)<{ type: IAnyType }>`
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 100%;
  min-height: 58px;
  border-color: ${({ type }) => style[type].borderColor};
  border-width: ${({ type }) => style[type].borderWidth};
  opacity: 1;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  border-radius: 8px;
  ${compose(backgroundColor, border, height, layout, flexbox, space)};
  ${({ type }) => style[type].Wrapper};
`;

export const Background = styled(LinearGradient).attrs(
  ({ disabled }: { disabled: boolean }) => ({
    colors: disabled ? ["#dadada", "#d3d3d3"] : ["#4770d4", "#234083"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  })
)<{ disabled: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const BackgroundDelete = styled(LinearGradient).attrs(
  ({ disabled }: { disabled: boolean }) => ({
    colors: disabled ? ["#dadada", "#d3d3d3"] : [`${Colors.red}bb`, Colors.red],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  })
)<{ disabled: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Label = styled(CustomText)<{ type: IAnyType }>`
  font-size: 16px;
  color: ${({ color, type }) => color || style[type].color};
`;

export const LoadingPlaceholder = styled.View`
  width: 40px;
`;

export const Loading = styled(ActivityIndicator).attrs(
  ({ type }: { type: string }) => ({
    size: "small",
    color: style[type].indicatorColor || style[type].color,
  })
)<{ type: string }>`
  width: 40px;
`;
