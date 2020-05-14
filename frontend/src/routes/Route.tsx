import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

/* Pega toas das propriedades que já existem para as rotas
 * path, component, exact ...
 * e cria as personalizadas (isPrivate)
 * */
interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

/**
 * Valor padrão da variável isPrivate é false
 */
const Routes: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  // se tiver dados na variável user quer dizer que esta logado
  const { user } = useAuth();

  /**
   * ReactDOMRoute é o component Route do react-router-dom com outro nome
   * ele recebe todas as propriedades de um Route e verifica na propriedade
   * render (através de uma função) se o usuário está tentando acessar uma rota
   * privada e se ele está logado. Caso alguma condição seja falsa, redireciona
   * para a página adequada.
   * state: { from: location } -> mantem o histórico de acesso
   */
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Routes;
