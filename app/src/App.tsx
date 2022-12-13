import { ToastContainer } from 'react-toastify';
import { LoaderProvider } from "./context/loader";
import Router from './router';
import * as yup from 'yup';

import './styles/core.scss';

yup.setLocale({
  mixed: {
    required: '${path} é um campo obrigatório!',
    notType: '${path} é um campo obrigatório!'
  },
  string: {
    min: '${path} deve ter mais que ${min} caracteres!',
    max: '${path} deve ter no máximo ${max} caracteres!',
    email: '${path} deve ser um e-mail válido!'
  },
});

function App() {
  return (
    <LoaderProvider>
        <ToastContainer />
        <Router />
    </LoaderProvider>
  );
}

export default App;
