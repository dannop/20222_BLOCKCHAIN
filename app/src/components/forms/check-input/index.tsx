import { ChangeEventHandler, forwardRef } from 'react';

import './style.scss';

interface CheckInputProps {
  labelText?: string,
  id?: string,
  name?: string,
  value: string,
  type?: "checkbox" | "switch" | "radio",
  maxLength?: number,
  onChange?: ChangeEventHandler,
  required?: boolean,
  disabled?: boolean,
  invalid?: boolean,
  className?: string,
  checked?: boolean
}

const CheckInput = forwardRef<HTMLInputElement, CheckInputProps>((props, ref) => {
  const { labelText, invalid, className, ...fieldProps } = props;

  const input_props = {
    ...fieldProps,
    type: fieldProps.type === 'switch' ? 'checkbox' : fieldProps.type,
    ref
  }

  return (
    <>
      <div className={`check-input-container ${fieldProps.type === 'switch' ? 'switch' : ''} ${invalid ? 'invalid' : ''} ${className ? className : ''}`}>
        <input {...input_props} />
        {labelText && <label className='body-lg ml-xxsm' htmlFor={fieldProps.id}>{labelText}</label>}
      </div>
    </>
  )
}) 

export default CheckInput;