import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthLayout from '../components/auth-layout';
import TextInput from '../../../components/forms/text-input';
import DefaultBtn from '../../../components/default-btn';
import { Visible } from '../../../components/icons';

import LoaderContext from '../../../context/loader';
import { StorageService } from '../../../services';
import { AuthApi } from '../../../services/api-routes';

import LogoImg from '../../../assets/images/chopper-coin.png';

import './style.scss';

export default function SignInPage(props: any){
  const { setLoading } = useContext(LoaderContext);

  const history = useHistory();
  
  const [values, setValues] = useState({
      private_key: ''
  });
  const [show_password, setShowPassword] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValues({...values, [event.target.name]: event.target.value})
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    StorageService.login(values['private_key']);
    // const resp = await AuthApi.auth.login(values);
    // if (resp) {
      history.push('/');
    // }
    setLoading(false);
  }

  return (
    <AuthLayout>
      <form className='w-100 text-center' onSubmit={onSubmit}>
        <img className="logoImg mb-lg" src={LogoImg} alt="Logo do Projeto" />
        <div className="mb-xlg w-100">
          <TextInput 
            type={show_password ? "text" : "password"}
            labelText='Private Key'
            name='private_key'
            value={values['private_key']}
            onChange={onChange}
            placeholder='Private Key'
            rightBtnAction={() => setShowPassword(!show_password)}
            icon={show_password ? <Visible /> : <Visible />}
          />
        </div>
        <DefaultBtn 
            type='submit'
            block
            className='mb-sm'
        >
          Sign in
        </DefaultBtn>
        <DefaultBtn 
          type='button'
          outline 
          onClick={() => props.history.push("sign-up")}
          block
          className='mb-sm'
        >
          Sign up
        </DefaultBtn>
      </form>
    </AuthLayout>
  );
}