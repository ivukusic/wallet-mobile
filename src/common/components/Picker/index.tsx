import React from "react";

import { Picker as PickerNative } from "@react-native-picker/picker";

import { Container } from "../Container";
import { PickerItem, Props } from "./types";
import { useHook } from "./hook";

export const Picker: React.FC<Props> = ({
  containerProps = {},
  data,
  onChange,
  value,
}) => {
  const { handleChange } = useHook({ onChange });

  const renderItem = (item: PickerItem) => (
    <PickerNative.Item key={item.value} label={item.label} value={item.value} />
  );

  return (
    <Container {...containerProps} width="100%">
      <PickerNative selectedValue={value} onValueChange={handleChange}>
        {data.map(renderItem)}
      </PickerNative>
    </Container>
  );
};
