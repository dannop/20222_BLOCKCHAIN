import { useState, useContext, ChangeEvent } from 'react';

import LoaderContext from '../../../context/loader';
import { StorageService } from '../../../services';

import TextInput from '../../../components/forms/text-input';
import DefaultBtn from '../../../components/default-btn';
import AuthLayout from '../components/auth-layout';

import LogoImg from '../../../assets/images/chopper-coin.png';

export default function SignUpPage(props: any){
  const { setLoading } = useContext(LoaderContext);
  
  const [values, setValues] = useState({
      name: '',
      email: '',
      password: ''
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValues({...values, [event.target.name]: event.target.value})
  }

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    const resp = {token: `${name}_${password}`, email};
    StorageService.login(resp.token);
    props.history.push({pathname: '/home'});
  }

  return (
    <AuthLayout>
      <>
        <img className="logoImg" src={LogoImg} alt="Logo do Projeto" />
        <div className="mb-sm w-100">
          <TextInput 
            type="text"
            labelText='Nome'
            name='name'
            value={values['name']}
            onChange={onChange}
            placeholder='Digite seu nome'
            required={true}
          />
        </div>
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
            type="password"
            labelText='Senha'
            name='password'
            value={values['password']}
            onChange={onChange}
            placeholder='Digite sua senha'
            required={true}
          />
        </div>
        <DefaultBtn 
            onClick={()=> register(values['name'], values['email'], values['password'])}
            block
            className='mb-md'
        >
          Concluir
        </DefaultBtn>
        <DefaultBtn 
            block
            outline
            onClick={() => props.history.push("sign-in")}
        >
          Voltar ao Login
        </DefaultBtn>
      </>
    </AuthLayout>
  );
}