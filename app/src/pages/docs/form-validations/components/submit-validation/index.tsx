import { ChangeEvent, FormEvent, useState } from "react";
import * as yup from 'yup';

import DefaultBtn from "../../../../../components/default-btn";
import TextInput from "../../../../../components/forms/text-input";

import { Validation } from "../../../../../util";

const SubmitValidationForm = () => {
    const formSchema = yup.object({
      name: yup.string().required().label('Nome'),
      email: yup.string().email().required().label("E-mail")
    });

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState<any>({});

    console.log('errors', errors)
  
    const clearFieldError = (event: ChangeEvent<HTMLInputElement>) => {
      if (errors && errors[event.target.name]) {
        setErrors((prevState: any) => {
          const newState = {...prevState};
          delete newState[event.target.name];
          return newState;
        })
      }
    }

    const onSubmit = async (event: FormEvent) => {
      event.preventDefault();
      console.log('values', values)
      const data: any = await Validation.resolveValidation({schema: formSchema, mode: 'formFields', fields: values});
      if (data?.error) {
        data.error.inner.forEach((error: any) => {
            setErrors({...errors, [error.path]: {message: error.message}})
        })
      }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.value})
        clearFieldError(event)
    }

    return (
        <form onSubmit={onSubmit}>
            <h4 className="subtitle-md mb-sm">On Submit Validation</h4>
            <div className="mb-sm">
                <TextInput
                    type="text"
                    labelText='Nome'
                    name='name'
                    value={values['name']}
                    onChange={onChange}
                    placeholder='Digite seu nome'
                    invalid={errors?.name}
                    supportText={errors?.name?.message}
                />
            </div>
            <div className="mb-sm">
                <TextInput
                    type="e-mail"
                    labelText='E-mail'
                    name='email'
                    value={values['email']}
                    onChange={onChange}
                    placeholder='Digite seu e-mail'
                    invalid={errors?.email}
                    supportText={errors?.email?.message}
                />
            </div>
            <div className="mb-sm">
                <TextInput
                    mask="(99) 99999-9999"
                    type="text"
                    labelText='Telefone'
                    name='phone'
                    value={values['phone']}
                    onChange={onChange}
                    placeholder='(99) 99999-9999'
                />
            </div>
            <div className="d-flex align-items-center justify-content-end">
                <DefaultBtn type='submit'>Enviar</DefaultBtn>
            </div>
        </form>
    )
}
  
export default SubmitValidationForm