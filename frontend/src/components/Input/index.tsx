import React, {
  InputHTMLAttributes,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

// propreidades do icone

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

/**
 * Interface recebe todas as propriedades de um input
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // sobrescreve para name ser obrigatório
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName, // nome do input
      ref: inputRef.current, // forma de acessar o elemento de forma direta
      path: 'value', // acessar o valor do input
    });
  }, [fieldName, registerField]);

  /* sempre que for criar uma função dentro de um componente é necessário
  usar useCallback */
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    /**
     * com o inputRef é possivel acessar as propriedades de um input
     * (obs: foi colocado como tipagem o HTMLInputElement). Desta forma é
     * possível verificar se o input possui algum valor já preenchido
     * setIsFilled(!!inputRef.current?.value); se tiver valor true, se não false
     * !! trasforma em booleano
     */
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container hasError={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        autoComplete="new-off"
        onFocus={handleInputFocused} // recebeu foco
        onBlur={handleInputBlur} // perdeu foco
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {/* <span> */}
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
      {/* </span> */}
    </Container>
  );
};

export default Input;
