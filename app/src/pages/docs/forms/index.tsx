import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom";

import CheckInput from "../../../components/forms/check-input";
import SelectInput from "../../../components/forms/select-input";
import TextInput from "../../../components/forms/text-input"

const FormsPage = () => {
    const [values, setValues] = useState({
        label_1: '',
        password_1: '',
        textarea_1: '',
        label_2: '',
        password_2: '',
        textarea_2: '',
        select_1: null,
        select_2: null,
        select_3: null,
        select_4: null,
        checkbox_1: '',
        checkbox_2: '',
        checkbox_3: '',
        checkbox_4: false,
        radio: '',
        switch: false
    });

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const onCheck = (event: ChangeEvent<HTMLInputElement>) => {
      setValues({...values, [event.target.name]: event.target.checked})
  }

    const onChangeSelect = (value: any, name: string) => {
      setValues({...values, [name]: value})
    }

    const test_icon = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 10.59L15.59 7L17 8.41L13.41 12L17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59Z"/>
      </svg>
    )

    const visibility_icon = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6.5C15.79 6.5 19.17 8.63 20.82 12C19.17 15.37 15.79 17.5 12 17.5C8.21 17.5 4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM12 7.5C9.52 7.5 7.5 9.52 7.5 12C7.5 14.48 9.52 16.5 12 16.5C14.48 16.5 16.5 14.48 16.5 12C16.5 9.52 14.48 7.5 12 7.5Z" fill="black"/>
      </svg>
    )

    const text_inputs = (
      <div className="row mb-xhuge">
        <div className="col-6">
          <div className="mb-md">
            <TextInput 
              type="text"
              name="label_1"
              value={values['label_1']}
              onChange={onChange}
              labelText='Label'
              icon={test_icon}
              placeholder='Placeholder'
              supportText='Supporting text'
            />
          </div>
          <div className="mb-md">
            <TextInput 
              type="password"
              name="password_1"
              value={values['password_1']}
              onChange={onChange}
              labelText='Label'
              icon={visibility_icon}
              rightBtnAction={() => console.log('visible')}
              placeholder='Placeholder'
            />
          </div>
          <div className="mb-md">
            <TextInput 
              type="textarea"
              name="textarea_1"
              value={values['textarea_1']}
              onChange={onChange}
              labelText='Label'
              placeholder='Placeholder'
            />
          </div>
        </div>

        <div className="col-6">
          <div className="mb-md">
            <TextInput 
              type="text"
              name="label_2"
              value={values['label_2']}
              onChange={onChange}
              labelText='Label'
              icon={test_icon}
              placeholder='Placeholder'
              supportText='Supporting text'
              invalid
            />
          </div>
          <div className="mb-md">
            <TextInput 
              type="text"
              name="password_2"
              value={values['password_2']}
              onChange={onChange}
              labelText='Label'
              icon={visibility_icon}
              rightBtnAction={() => console.log('visible')}
              placeholder='Placeholder'
              invalid
            />
          </div>
          <div className="mb-md">
            <TextInput 
              type="textarea"
              name="textarea_2"
              value={values['textarea_2']}
              onChange={onChange}
              labelText='Label'
              placeholder='Placeholder'
              invalid
            />
          </div>
        </div>
      </div>
    )

    const select_inputs = (
      <div className="row mb-xhuge">
        <div className="col-6">
          <div className="mb-md">
            <SelectInput 
                options={[
                  {label: 'teste 1', value: 'teste_1'},
                  {label: 'teste 2', value: 'teste_2'},
                  {label: 'teste 3', value: 'teste_3'},
                  {label: 'teste 4', value: 'teste_4'}
                ]}
                onChange={value => onChangeSelect(value, 'select_1')}
                labelText='Label'
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-md">
            <SelectInput 
                options={[
                  {label: 'teste 1', value: 'teste_1'},
                  {label: 'teste 2', value: 'teste_2'},
                  {label: 'teste 3', value: 'teste_3'},
                  {label: 'teste 4', value: 'teste_4'}
                ]}
                onChange={value => onChangeSelect(value, 'select_2')}
                labelText='Label'
                supportText='Campo desabilitado!'
                isDisabled
            />
          </div>
        </div>
        <div className="col-6">
          <SelectInput 
              options={[
                {label: 'teste 1', value: 'teste_1'},
                {label: 'teste 2', value: 'teste_2'},
                {label: 'teste 3', value: 'teste_3'},
                {label: 'teste 4', value: 'teste_4'}
              ]}
              onChange={value => onChangeSelect(value, 'select_3')}
              labelText='Label'
              isClearable
          />
        </div>
        <div className="col-6">
          <SelectInput 
              options={[
                {label: 'teste 1', value: 'teste_1'},
                {label: 'teste 2', value: 'teste_2'},
                {label: 'teste 3', value: 'teste_3'},
                {label: 'teste 4', value: 'teste_4'}
              ]}
              onChange={value => onChangeSelect(value, 'select_4')}
              labelText='Label'
              invalid
              supportText='Input inválido!'
          />
        </div>
      </div>
    )

    const chevron_left = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.7912 11.005H7.62124L12.5012 6.12498C12.8912 5.73498 12.8912 5.09498 12.5012 4.70498C12.1112 4.31498 11.4812 4.31498 11.0912 4.70498L4.50124 11.295C4.11124 11.685 4.11124 12.315 4.50124 12.705L11.0912 19.295C11.4812 19.685 12.1112 19.685 12.5012 19.295C12.8912 18.905 12.8912 18.275 12.5012 17.885L7.62124 13.005H18.7912C19.3412 13.005 19.7912 12.555 19.7912 12.005C19.7912 11.455 19.3412 11.005 18.7912 11.005Z" fill="#881477"/>
      </svg>
    )

    const check_inputs = (
      <div className="row">
        <div className="col-6">
          <div className="mb-md d-flex">
            <div className="mr-sm">
              <CheckInput 
                type="checkbox"
                id="checkbox_1"
                name="checkbox_1"
                value="value_1"
                onChange={onChange}
                labelText='label 1'
              />
            </div>
            <div className="mr-sm">
              <CheckInput 
                type="checkbox"
                id="checkbox_2"
                name="checkbox_2"
                value="value_2"
                onChange={onChange}
                labelText='label 2'
              />
            </div>
            <div className="mr-sm">
              <CheckInput 
                type="checkbox"
                id="checkbox_3"
                name="checkbox_3"
                value="value_3"
                onChange={onChange}
                labelText='label 3'
              />
            </div>
            <CheckInput 
                type="checkbox"
                id="checkbox_4"
                name="checkbox_4"
                value="value_4"
                onChange={onCheck}
            />
          </div>
          <div className="mb-md d-flex">
            <div className="mr-sm">
              <CheckInput 
                id='radio_1'
                type="radio"
                name="radio"
                value="radio_1"
                onChange={onChange}
                labelText="label 1"
              />
            </div>
            <div className="mr-sm">
              <CheckInput 
                id='radio_2'
                type="radio"
                name="radio"
                value="radio_2"
                onChange={onChange}
                labelText="label 2"
              />
            </div>
            <div className="mr-sm">
              <CheckInput 
                id='radio_3'
                type="radio"
                name="radio"
                value="radio_3"
                onChange={onChange}
                labelText="label 3"
              />
            </div>
          </div>
          <div className="mb-md">
            <CheckInput 
              type="switch"
              id='switch'
              name="switch"
              value='switch-teste'
              onChange={onCheck}
              labelText='Switch'
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-md">
            <CheckInput 
              type="checkbox"
              name="label"
              value='teste'
              disabled
            />
          </div>
          <div className="mb-md">
            <CheckInput 
              type="radio"
              name="label-2"
              value="teste"
              disabled
            />
          </div>
          <div className="mb-md">
            <CheckInput 
              type="switch"
              id='switch'
              name="switch"
              value='switch-teste'
              onChange={onCheck}
              disabled
            />
          </div>
        </div>
      </div>
    )

    return (
      <section className="py-lg">
        <div className="container">
            <Link className="text-link mb-xsm" to='/docs'>
              {chevron_left} 
              <span className="ml-xxsm">back</span>
            </Link>
            <h1 className="heading-lg mb-huge">Forms</h1>
            {text_inputs}
            {select_inputs}
            {check_inputs}
        </div>
      </section>
    )
  }
  
  export default FormsPage