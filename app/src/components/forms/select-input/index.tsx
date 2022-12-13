import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import Select, { Props, components, Theme } from 'react-select';

import './style.scss';
import { AddCircle } from '../../icons';

type SelectInputProps = Props & {
  labelText?: string,
  invalid?: boolean,
  isAsync?: boolean,
  isCreatable?: boolean,
  className?: string,
  supportText?: string,
  onCreateOption?: Function
}

const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 9.5L12 14.5L17 9.5H7Z" fill="#3F353D"/>
    </svg>
  </components.DropdownIndicator>
);

const Option = (props: any) => (
  <components.Option {...props}>
    {props.data.__isNew__
      ? (
        <div className="text-link d-flex align-items-center justify-content-center">
          <AddCircle size={18} color="#881477"/>
          <span className='ml-xsm'>Adicionar Novo</span>
        </div>
      )
      : props.children
    }
  </components.Option>
)

const SelectInput = (props: SelectInputProps) => {
  const { labelText, name, isAsync, isCreatable, className, invalid, supportText, ...input_props } = props;

  const theme = (theme: Theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: 'rgba(212, 120, 199, 0.08)', // for option hover bg-color
      primary: '#3D3D3D', // gray-800 - for active option bg-color
      primary50: 'rgba(212, 120, 199, 0.08)', // for option focus bg-color
      neutral10: '#881477', // brand-primary - for tags bg-color
      dangerLight: '#BA38A7', // brand-primary - for tags hover bg-color
      neutral80: '#FFFFFF', // white -  for tags text bg-color
      neutral20: '#CCCCCC', // plataforma-border - for input border-color
      neutral30: '#CCCCCC', // plataforma-border - for input hover border-color
    }
  })

  const select_props = {
    className: 'react-select',
    classNamePrefix: 'select',
    components: {DropdownIndicator, Option, ...props.components},
    noOptionsMessage: () => "Lista de opções vazia",
    theme,
    ...input_props
  }

  let SelectTag = Select;

  if (isAsync) {
    SelectTag = AsyncSelect;
  }

  if (isCreatable) {
    SelectTag = CreatableSelect;
  }

  return (
    <div className={`select-input-container ${className ? className : ''} ${invalid ? 'invalid' : ''}`}>
      {supportText && <p className={`body-sm ml-sm mt-xxsm support-text ${invalid ? 'invalid' : ''}`}>{supportText}</p>}
      <SelectTag {...select_props} />
      {labelText && <label className='label-sm mb-xxsm' htmlFor={name}>{labelText}</label>}
    </div>
  );
}

export default SelectInput;