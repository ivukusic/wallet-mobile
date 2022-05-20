import styled from 'styled-components/native';

import { Colors } from '~/themes';

import { TouchableOpacity } from '../TouchableOpacity';

export const Option = styled(TouchableOpacity)<{
  first: boolean;
  last: boolean;
  selected: boolean;
}>`
  flex: 1;
  max-width: 48%;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-width: 1px;
  border-color: ${({ selected }) => (selected ? Colors.primary : Colors.borderLight)};
  border-top-left-radius: ${({ first }) => (first ? '6px' : '0px')};
  border-bottom-left-radius: ${({ first }) => (first ? '6px' : '0px')};
  border-top-right-radius: ${({ last }) => (last ? '6px' : '0px')};
  border-bottom-right-radius: ${({ last }) => (last ? '6px' : '0px')};
`;
