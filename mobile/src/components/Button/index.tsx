import React from 'react';
import { View } from 'react-native';

import { Container, ButtonText } from './styles';

const Button: React.FC = ({ children }) => {
  return (
    <Container>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
