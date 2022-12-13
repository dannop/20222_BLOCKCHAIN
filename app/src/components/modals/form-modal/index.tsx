import { FormEventHandler, ReactElement } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';

import DefaultBtn from '../../default-btn';
import Loader from '../../loader';

import './style.scss';

interface FormModalProps extends ModalProps {
    title: string,
    form_content: ReactElement,
    submitButtonText: string,
    onSubmit: FormEventHandler,
    is_loading: boolean,
    disableSubmition?: boolean,
    className?: string,
    customButton?: ReactElement
}

const FormModal = (props: FormModalProps) => {
    const { title, form_content, submitButtonText, is_loading, onSubmit, disableSubmition, 
        customButton, className, ...modalProps } = props;

    return (
        <Modal 
            className={`default-modal${className ? ` ${className}` : ''}`}
            {...modalProps}
        >
            <form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='scroll-container'>
                    {form_content}
                </Modal.Body>
                <Modal.Footer>
                    {customButton}
                    <DefaultBtn 
                        type='submit'
                        className='submit-btn'
                        block
                        disabled={disableSubmition}
                    >
                    {is_loading 
                        ? <Loader color="white" size={25}/>
                        : submitButtonText
                    }
                    </DefaultBtn>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

FormModal.defaultProps = {
    size: 'lg',
    centered: true
}

export default FormModal;