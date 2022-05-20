import {
  BackgroundColorProps,
  FlexboxProps,
  LayoutProps,
  PaddingProps,
  SpaceProps,
} from 'styled-system';

export interface ContainerProps
  extends SpaceProps,
    LayoutProps,
    FlexboxProps,
    BackgroundColorProps,
    PaddingProps {}
