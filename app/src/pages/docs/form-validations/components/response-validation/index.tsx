import { ChangeEvent, FormEvent, useState } from "react";
import DefaultBtn from "../../../../../components/default-btn";

import TextInput from "../../../../../components/forms/text-input";

const ResponseValidationForm = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const [errors, setErrors] = useState<any>(null);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.dir(event.currentTarget)
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      console.log('data', data)
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.value})
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
                    pattern='[A-Za-z]{3}'
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
  
export default ResponseValidationForm