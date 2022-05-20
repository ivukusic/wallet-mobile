import React from 'react';

import {
  BackgroundColorProps,
  BorderProps,
  FlexboxProps,
  HeightProps,
  LayoutProps,
  SpaceProps,
} from 'styled-system';

import { CustomTextProps } from '~/components/CustomText/types';

interface ContainerProps
  extends BackgroundColorProps,
    BorderProps,
    HeightProps,
    LayoutProps,
    FlexboxProps,
    SpaceProps {}

export interface Props {
  label?: string;
  loading?: boolean;
  containerProps?: ContainerProps;
  icon?: string;
  renderIcon?: () => React.ReactNode;
  type?: 'default' | 'primary' | 'list' | 'delete';
  disabled?: boolean;
  onPress: () => void;
  labelProps?: CustomTextProps;
}
