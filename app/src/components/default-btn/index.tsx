import { forwardRef, ReactChild, ReactChildren } from 'react';
import './style.scss';

interface DefaultBtnProps {
    onClick?: Function,
    children?: ReactChild | ReactChildren | ReactChild[],
    className?: string,
    color?: "primary" | "secondary" | "error" | string,
    size?: "lg" | "md" | "sm",
    outline?: boolean,
    disabled?: boolean,
    icon?: boolean,
    block?: boolean,
    type?: "button" | "submit" | "reset"
}

const DefaultBtn = forwardRef<HTMLButtonElement, DefaultBtnProps>((props, ref) => {
    const { children, onClick, className, color, outline, icon, size, 
      disabled, block, type } = props;

    
    return (
        <button 
            className={`label-${size} default-btn btn-${size} ${className ? className : ''} ${color} ${outline ? 'btn-outline' : ''} ${icon ? 'btn-icon' : ''} ${block ? 'btn-block' : ''}`}
            onClick={event => onClick ? onClick(event) : null}
            disabled={disabled}
            type={type}
            ref={ref}
        >
            {children}
        </button>
    )
}) 

DefaultBtn.defaultProps = {
    color: 'primary',
    outline: false,
    disabled: false,
    icon: false,
    block: false,
    size: 'lg',
    type: 'button'
}

export default DefaultBtn;