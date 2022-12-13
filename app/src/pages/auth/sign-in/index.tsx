import { useState, useContext, ChangeEvent } from 'react';

import LoaderContext from '../../../context/loader';

import { StorageService } from '../../../services';

import AuthLayout from '../components/auth-layout';
import TextInput from '../../../components/forms/text-input';
import DefaultBtn from '../../../components/default-btn';

import LogoImg from '../../../assets/images/conecta-icon.png';
import { Link } from 'react-router-dom';

export default function SignInPage(props: any){
  const { setLoading } = useContext(LoaderContext);
  
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [show_password, setShowPassword] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  const login = async (email: string, password: string) => {
    // setLoading(true);
    StorageService.login(password);
    props.history.push('/docs');
  }

  const visibility_icon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.5C15.79 6.5 19.17 8.63 20.82 12C19.17 15.37 15.79 17.5 12 17.5C8.21 17.5 4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM12 7.5C9.52 7.5 7.5 9.52 7.5 12C7.5 14.48 9.52 16.5 12 16.5C14.48 16.5 16.5 14.48 16.5 12C16.5 9.52 14.48 7.5 12 7.5Z" fill="black"/>
    </svg>
  )

  return (
    <AuthLayout>
      <>
        <img className="logoImg mb-md" src={LogoImg} alt="Logo da Conecta" />
        <div className="mb-sm w-100">
          <TextInput 
            type="e-mail"
            labelText='E-mail'
            name='E-mail'
            value={values['email']}
            onChange={onChange}
            placeholder='Digite seu e-mail'
            required={true}
          />
        </div>
        <div className="mb-sm w-100">
          <TextInput 
            type={show_password ? "text" : "password"}
            labelText='Senha'
            name='password'
            value={values['password']}
            onChange={onChange}
            placeholder='Digite sua senha'
            required={true}
            rightBtnAction={() => setShowPassword(!show_password)}
            icon={show_password ? visibility_icon : visibility_icon}
          />
        </div>
        <DefaultBtn 
            onClick={() => login(values['email'], values['password'])}
            block
            className='mb-sm'
        >
          Entrar
        </DefaultBtn>
        <DefaultBtn 
          outline 
          onClick={() => props.history.push("sign-up")}
          block
          className='mb-sm'
        >
          Cadastre-se
        </DefaultBtn>
        <Link to='recovery' className='text-link'>Esqueci minha senha</Link>
      </>
    </AuthLayout>
  );
}