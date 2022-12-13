import DefaultBtn from "../default-btn";

import './style.scss';

interface EmptyListProps {
    title?: string,
    description?: string,
    buttonLabel?: string,
    buttonAction?: Function,
    height?: number,
    className?: string
}

const EmptyList = (props: EmptyListProps) => {
    const { title, description, buttonLabel, buttonAction, height, className } = props;

    return (
        <div style={{height}} className={`empty-list ${className ? className : ''}`}>
            <h4 className="subtitle-lg mb-xxsm text-placeholder">{title}</h4>
            <p className="body-md text-placeholder">{description}</p>
            {buttonLabel && 
                <DefaultBtn 
                    className="mt-lg" 
                    onClick={buttonAction}
                    outline
                    size="md"
                >
                        {buttonLabel}
                </DefaultBtn>
            }
        </div>
    )
}

export default EmptyList