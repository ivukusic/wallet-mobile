import { Text } from 'react-native';

import styled from 'styled-components/native';
import {
  space,
  layout,
  compose,
  fontSize,
  lineHeight,
  color,
  textAlign,
  flexbox,
  size,
} from 'styled-system';

import { Colors } from '~/themes';

import { CustomTextStyle } from './types';

export const Container = styled(Text)<CustomTextStyle>`
  text-decoration: ${({ underline }): string => (underline ? 'underline' : 'none')};
  text-align-vertical: center;
  ${compose(space, layout, fontSize, lineHeight, color, textAlign, flexbox, size)}
`;

Container.defaultProps = {
  color: Colors.body,
  type: 'body',
};
