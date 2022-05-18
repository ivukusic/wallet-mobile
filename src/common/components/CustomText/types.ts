import { PropsWithChildren } from "react";
import { TextProps } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import {
  SpaceProps,
  LayoutProps,
  FontSizeProps,
  LineHeightProps,
  ColorProps,
  TextAlignProps,
  FlexboxProps,
  SizeProps,
} from "styled-system";

export type TypeScale =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h5"
  | "h5"
  | "h6"
  | "body"
  | "caption";

export type TypographyProps = {
  color: string;
  fontSize: string;
  lineHeight: string;
};
type Typography = {
  [type in TypeScale]?: TypographyProps;
};

export type TypographyWeightProps = {
  fontFamily: string;
};

export const TYPOGRAPHY: Typography = {
  h1: {
    color: Colors.black,
    fontSize: "36px",
    lineHeight: "42px",
  },
  h2: {
    color: Colors.black,
    fontSize: "30px",
    lineHeight: "36px",
  },
  h3: {
    color: Colors.black,
    fontSize: "24px",
    lineHeight: "28px",
  },
  h4: {
    color: Colors.black,
    fontSize: "22px",
    lineHeight: "26px",
  },
  h5: {
    color: Colors.black,
    fontSize: "20px",
    lineHeight: "24px",
  },
  h6: {
    color: Colors.black,
    fontSize: "18px",
    lineHeight: "22px",
  },
  body: {
    color: Colors.body,
    fontSize: "16px",
    lineHeight: "22px",
  },
  caption: {
    color: Colors.black,
    fontSize: "14px",
    lineHeight: "18px",
  },
};

export interface CustomTextStyle
  extends SpaceProps,
    LayoutProps,
    FontSizeProps,
    LineHeightProps,
    TextAlignProps,
    FlexboxProps,
    SizeProps,
    ColorProps {
  type?: TypeScale;
  underline?: boolean;
  underlineColor?: string;
}

export type Props = PropsWithChildren<CustomTextStyle & TextProps>;

export type CustomTextProps = Props;
