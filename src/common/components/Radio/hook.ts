import { Props } from "./types";

export const useHook = ({ onChange }: Partial<Props>) => {
  const handleChange = (itemValue: string) => () => {
    if (onChange) {
      onChange(itemValue);
    }
  };

  return { handleChange };
};
