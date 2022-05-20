import { Animated } from 'react-native';

import styled from 'styled-components/native';

import { TouchableOpacity } from '~/components/TouchableOpacity';
import { Colors } from '~/themes';

export const FlatContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${Colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-top-width: 1px;
  border-top-color: ${Colors.borderLight};
`;

export const FlatList = styled(Animated.FlatList).attrs({
  contentContainerStyle: { paddingBottom: 240 },
})`
  width: 100%;
`;

export const FilterButton = styled(TouchableOpacity)<{ selected: boolean }>`
  padding: 10px 20px;
  margin-right: 5px;
  background-color: ${({ selected }) => (selected ? Colors.primary : Colors.borderLight)};
  border-radius: 20px;
`;
