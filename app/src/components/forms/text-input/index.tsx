import { ChangeEventHandler, forwardRef, InputHTMLAttributes, ReactElement } from 'react';
import InputMask from 'react-input-mask';

import { Invalid } from '../../icons';

import './style.scss';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  labelText?: string,
  type: "text" | "number" | "e-mail" | "password" | "textarea" | "date" | "time" | "mask",
  mask?: string,
  rightBtnAction?: Function,
  icon?: ReactElement,
  invalid?: boolean,
  className?: string,
  supportText?: string
}

const TextInput = forwardRef<any, TextInputProps>((props, ref) => {
  const { mask, rightBtnAction, icon, invalid, className, 
    supportText, labelText, type, ...fieldProps } = props;

  const right_btn = (
    <button type='button' onClick={() => rightBtnAction ? rightBtnAction() : null} className={`right-icon ${rightBtnAction ? 'icon-btn' : ''}`}>
      {(invalid && !rightBtnAction) ? <Invalid /> : icon}
    </button>
  );

  const mask_input_props = {
    ...fieldProps,
    type: 'text',
    invalid,
    mask: mask || '',
    // ref
  }

  const input_props = {
    ...fieldProps,
    type,
    invalid,
    ref
  }

  const inputs: any = { 
    'mask': {tag: InputMask, input_props: mask_input_props}, 
    'textarea': {tag: 'textarea', input_props}, 
    'text': {tag: 'input', input_props},
    'number': {tag: 'input', input_props},
    'e-mail': {tag: 'input', input_props},
    'password': {tag: 'input', input_props},
    'date': {tag: 'input', input_props},
    'time': {tag: 'input', input_props}
  }

  const InputTag = inputs[type].tag;
  const input_tag_props = inputs[type].input_props;

  return (
    <>
      <div className={`text-input-container ${invalid ? 'invalid' : ''} ${className ? className : ''} ${fieldProps.value ? 'filled' : ''}`}>
        <InputTag {...input_tag_props}/>
        <label className='label-sm mb-xxsm' htmlFor={fieldProps.name}>{labelText}</label>
        {icon && right_btn}
      </div>
      {supportText && <p className={`body-sm ml-sm mt-xxsm support-text ${invalid ? 'invalid' : ''}`}>{supportText}</p>}
    </>
  )
}) 

export default TextInput;