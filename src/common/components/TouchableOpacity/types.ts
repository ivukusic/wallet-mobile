import { TouchableOpacityProps } from 'react-native';

export interface TouchableProps extends TouchableOpacityProps {
  debounce?: number;
}
