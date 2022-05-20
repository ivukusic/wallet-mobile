import React, { ReactNode } from "react";

import { FlexboxProps, LayoutProps, SpaceProps } from "styled-system";

export interface HeaderProps {
  customHeaderTitle?: ReactNode | string;
  headerLeftButton?: ReactNode;
  headerLogo?: boolean;
  headerMode?: "modal" | "white" | "default";
  headerBackTitle?: string;
  headerRightButton?: ReactNode;
  headerTintColor?: string;
  headerTitle?: ReactNode | string;
  onBackPress?: () => void;
}

export interface Props extends ContainerProps {
  ref?: ReactNode;
  bottomComponent?: React.ReactNode;
  mode?: "scroll" | "keyboard-aware" | "view";
  header?: HeaderProps;
  enableOnAndroid?: boolean;
  enableResetScrollToCoords?: boolean;
  extraScrollHeight?: number;
  keyboardShouldPersistTaps?: "handled" | "always" | "never";
}

interface ContainerProps extends SpaceProps, LayoutProps, FlexboxProps {
  backgroundColor?: string;
}

export interface BackButtonProps {
  canGoBack: boolean;
  onPress: () => void;
}
