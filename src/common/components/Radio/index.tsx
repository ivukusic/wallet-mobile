import React from 'react';

import { Container } from '../Container';
import { CustomText } from '../CustomText';
import { useHook } from './hook';
import { Option } from './styles';
import { OptionItem, Props } from './types';

export const Radio: React.FC<Props> = ({ containerProps, data, onChange, value }): JSX.Element => {
  const { handleChange } = useHook({ onChange });

  const renderOption = (item: OptionItem, index: number) => (
    <Option
      key={item.value}
      first={index === 0}
      last={index + 1 === data.length}
      selected={item.value === value}
      onPress={handleChange(item.value)}
    >
      <CustomText>{item.label}</CustomText>
    </Option>
  );

  if (!data.length) {
    return <></>;
  }
  return (
    <Container {...containerProps} width="100%">
      <Container flexDirection="row">{data.map(renderOption)}</Container>
    </Container>
  );
};

export default Radio;
