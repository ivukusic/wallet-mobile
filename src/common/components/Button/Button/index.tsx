import React from 'react';

import {
  Wrapper,
  Background,
  BackgroundDelete,
  Label,
  LoadingPlaceholder,
  Loading,
} from './styles';
import { Props } from './types';

export const Button: React.FC<Props> = ({
  label,
  loading = false,
  type = 'default',
  onPress,
  disabled = false,
  containerProps = {},
  labelProps = {},
  ...rest
}) => (
  <Wrapper
    activeOpacity={1}
    onPress={onPress}
    disabled={disabled || loading}
    type={type}
    {...containerProps}
    {...rest}
  >
    {type === 'primary' && !containerProps.backgroundColor && <Background disabled={!!disabled} />}
    {type === 'delete' && !containerProps.backgroundColor && (
      <BackgroundDelete disabled={!!disabled} />
    )}

    <LoadingPlaceholder />
    <Label customType={type} {...(labelProps || {})}>
      {label}
    </Label>
    <LoadingPlaceholder>{!!loading && <Loading type={type} />}</LoadingPlaceholder>
  </Wrapper>
);
