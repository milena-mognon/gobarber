import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/Toast';

import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  /**
   * 1º parametro: as mensagens
   * 2º parametro: uma função que recebe o id de cada mensagem
   * 3º parametro: objecto contendo as animaçãoes
   */
  const messagesWithTransictions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransictions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
