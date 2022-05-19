import { ContainerProps } from "../Container/types";

export interface PickerItem {
  label: string;
  value: string;
}

export interface Props {
  containerProps?: ContainerProps;
  data: PickerItem[];
  onChange: (itemValue: string, itemIndex: number) => void;
  value: string;
}
