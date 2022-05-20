import styled from 'styled-components/native';

import { TouchableOpacity } from '~/components/TouchableOpacity';
import { Colors } from '~/themes';

export const SendButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 30px;
  bottom: 30px;
  right: 20px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.primary};
  box-shadow: 0px 0px 4px ${`${Colors.black}66`};
`;
