import { render, screen } from '@testing-library/react';
import SignUpPage from '.';

test('Botão de Entrar na tela de Login', () => {
  render(<SignUpPage />);
  const linkElement = screen.getByText(/Concluir/i);
  expect(linkElement).toBeInTheDocument();
});

test('Botão de Cadastre-se na tela de Login', () => {
  render(<SignUpPage />);
  const linkElement = screen.getByText(/Voltar ao Login/i);
  expect(linkElement).toBeInTheDocument();
});