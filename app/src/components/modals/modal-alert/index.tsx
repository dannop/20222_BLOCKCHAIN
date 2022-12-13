import { ReactElement } from "react";
import { Modal, ModalProps } from "react-bootstrap";

import DefaultBtn from "../../default-btn";
import { Warning } from "../../icons";
import Loader from "../../loader";

import './style.scss';

interface AlertModalProps extends ModalProps {
    title: string,
    description: string | ReactElement,
    className?: string,
    confirmButtonText: string,
    cancelButtonText?: string,
    onCancel?: Function,
    onConfirm: Function,
    customConfirmButtonColor?: string,
    is_loading: boolean,
    customIcon?: ReactElement
}

const AlertModal = (props: AlertModalProps) => {
    const { title, description, confirmButtonText, cancelButtonText, customConfirmButtonColor, 
        className, is_loading, onCancel, onConfirm, customIcon, ...modalProps } = props;

    return (
        <Modal
            {...modalProps}
            className={`alert-modal${className ? ` ${className}` : ''}`}
            centered
            size='sm'
        >
            <div className="modal-body">
                {customIcon ? customIcon : <Warning size={40} />}
                <h2 className="heading-lg text-black mb-xsm">{title}</h2>
                <p className="body-md mb-xlg text-support text-center">{description}</p>
                <div className="d-flex align-items-center justify-content-center w-100 px-xsm">
                    {onCancel && <div className="col-6">
                        <DefaultBtn 
                            outline
                            color="primary"
                            className="mr-xxsm"
                            block
                            onClick={onCancel}
                        >
                            {cancelButtonText}
                        </DefaultBtn>
                    </div>}
                    <div className="col-6">
                        <DefaultBtn
                            color={customConfirmButtonColor ? customConfirmButtonColor : "error"}
                            className="ml-xxsm py-0"
                            block
                            onClick={!is_loading ? onConfirm : () => null}
                        >
                            {is_loading 
                                ? <Loader color="white" size={25}/>
                                : confirmButtonText
                            }
                        </DefaultBtn>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AlertModal