import { render, screen } from '@testing-library/react';
import SignInPage from '.';

test('Botão de Entrar na tela de Login', () => {
  render(<SignInPage />);
  const linkElement = screen.getByText(/Entrar/i);
  expect(linkElement).toBeInTheDocument();
});

test('Botão de Cadastre-se na tela de Login', () => {
  render(<SignInPage />);
  const linkElement = screen.getByText(/Cadastre-se/i);
  expect(linkElement).toBeInTheDocument();
});

test('Botão de Recuperar Senha na tela de Login', () => {
  render(<SignInPage />);
  const linkElement = screen.getByText(/Esqueci minha senha/i);
  expect(linkElement).toBeInTheDocument();
});