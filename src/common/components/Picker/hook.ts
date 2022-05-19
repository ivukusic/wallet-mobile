import { Props } from "./types";

export const useHook = ({ onChange }: Partial<Props>) => {
  const handleChange = (itemValue: string, itemIndex: number) => {
    if (onChange) {
      onChange(itemValue, itemIndex);
    }
  };

  return { handleChange };
};
