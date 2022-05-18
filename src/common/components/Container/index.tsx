import React from 'react';

import { ViewContainer } from './styles';
import { Props } from './types';

export const Container: React.FC<Props> = ({ children, ...rest }) => (
  <ViewContainer {...rest}>{children}</ViewContainer>
);
