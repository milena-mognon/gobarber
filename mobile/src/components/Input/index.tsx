import React from 'react';
/**
 * Todas as propriedades que um input pode receber
 */
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string; // passa a ser obrigatória (usada no unform)
  icon: string; // recebe o nome do ícone, diferente da web que recebe Icon
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        placeholderTextColor="#666360"
        {...rest}
        keyboardAppearance="dark" // funciona apenas em ios
      />
    </Container>
  );
};

export default Input;
