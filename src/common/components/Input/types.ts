import { KeyboardType } from 'react-native';

export interface InputProps {
  error?: string;
  label?: string;
  keyboardType: KeyboardType;
  onFocus?: () => void;
  onChangeText: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  value?: string;
}
