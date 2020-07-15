import React, { ButtonHTMLAttributes } from 'react';
import ReactLoading from 'react-loading';
import { Container } from './styles';

/**
 * type é usado quando não será sobrescrito ou adicionado novas propriedades
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

// children é o texto passado para o button (Entrar, Enviar...)
// rest são o resto das propriedades
const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? (
      <>
        <ReactLoading
          width={36}
          height={36}
          type="bubbles"
          className="spinner"
          color="#312e38"
        />
        Enviando
      </>
    ) : (
      children
    )}
  </Container>
);

export default Button;
