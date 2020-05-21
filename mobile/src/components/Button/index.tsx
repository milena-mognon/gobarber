import React from 'react';
/**
 * Propriedades que o button pode receber
 */
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string; // children passa a ser obrigatório
}

/**
 *
 * ...rest são todas as outras propriedades de um button
 * São definidadas na interface (extends RectButtonProperties)
 * children é a única que passa a ser obrigatória
 */
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    /**
     * Ao passar {...rest} para o container, as propriedades podem ser acessádas
     * no styles
     */
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
