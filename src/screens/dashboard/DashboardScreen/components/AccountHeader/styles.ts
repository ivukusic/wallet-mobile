import styled from 'styled-components/native';

import { Colors } from '~/themes';

export const Account = styled.View`
  width: 135px;
  height: 160px;
  border-radius: 8px;
  padding: 12px;
  justify-content: space-between;
  background-color: ${Colors.white};
`;

export const Scroll = styled.ScrollView`
  padding: 20px;
`;
