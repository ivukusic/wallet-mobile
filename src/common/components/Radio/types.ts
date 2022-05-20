import { ContainerProps } from "../Container/types";

export interface OptionItem {
  label: string;
  value: string;
}

export interface Props {
  containerProps?: ContainerProps;
  data: OptionItem[];
  onChange: (itemValue: string) => void;
  value: string;
}
