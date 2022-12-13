import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import TextInput from '../../../components/forms/text-input';
import DefaultBtn from '../../../components/default-btn';
import AuthLayout from '../components/auth-layout';

export default function RecoveryPage(){

  const [values, setValues] = useState({
      email: '',
  })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValues({...values, [event.target.name]: event.target.value})
  }

  return (
    <AuthLayout>
      <>
          <p className="defaultDescription">Digite seu e-mail para receber as próximas instrucões para recuperar sua senha.</p>
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
          <DefaultBtn 
              onClick={()=>console.log("cadastrar")}
              block
              className='mb-sm'
          >
            Recuperar Senha
          </DefaultBtn>
          <Link className='text-link' to='sign-in'>
            Voltar ao Login
          </Link>
      </>
    </AuthLayout>
  );
}