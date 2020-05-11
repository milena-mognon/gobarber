import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

/**
 * type é usado quando não será sobrescrito ou adicionado novas propriedades
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// children é o texto passado para o button (Entrar, Enviar...)
// rest são o resto das propriedades
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
