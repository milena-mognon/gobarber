import React, { useEffect } from 'react';

import {
  FiAlertCircle,
  FiCheckCircle,
  FiAlertTriangle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/Toast';

interface ToastProps {
  message: ToastMessage;
}
const toastIconsVariations = {
  error: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />,
  warning: <FiAlertTriangle size={20} />,
  info: <FiInfo size={20} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);
  return (
    <Container type={message.type} hasDescription={!!message.description}>
      {toastIconsVariations[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
