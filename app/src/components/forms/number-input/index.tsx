
import { InputHTMLAttributes } from 'react';

import { Add, Minus } from '../../icons';

import './style.scss';

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
    setValues: Function,
    name: string,
    value: number
}

const NumberInput = (props: NumberInputProps) => {
    const { setValues, ...inputProps } = props;

    return (
        <div className='number-input-container d-flex align-items-center'>
            <button
                type='button'
                onClick={() => setValues((oldState: any) => ({...oldState, [inputProps.name]: oldState[inputProps.name] - 1}))}
                disabled={inputProps.value <= 1}
            >
                <Minus size={24} color={inputProps.value <= 1 ? "#B8B4B7" : "#881477"}/>
            </button>
            <input 
                {...inputProps}
                type="number"
                className='body-lg text-default'
            />
            <button
                type='button'
                onClick={() => setValues((oldState: any) => ({...oldState, [inputProps.name]: oldState[inputProps.name] + 1}))}
            >
                <Add size={24} />
            </button>
        </div>
    )
}

export default NumberInput;