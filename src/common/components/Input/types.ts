import { IAnyType } from "~/types";

export interface InputProps {
  error?: string;
  label?: string;
  onFocus?: IAnyType;
  onChangeText: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  value?: string;
}
