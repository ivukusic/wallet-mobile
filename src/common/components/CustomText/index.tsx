import React from 'react';

import { Container } from './styles';
import { Props, TYPOGRAPHY } from './types';

export const CustomText = ({ type = 'body', children, ...props }: Props) => (
  <Container {...TYPOGRAPHY[type]} suppressHighlighting {...props}>
    {children}
  </Container>
);
