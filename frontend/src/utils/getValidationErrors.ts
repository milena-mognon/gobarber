import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}
/**
 * Função genérica que retorna um objeto com o nome no campo com erro e a
 * mensagem de erro
 */
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    // Ex. name = "nome obrigatório"
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
