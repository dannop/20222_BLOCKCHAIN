import { ReactElement } from "react";
import { Modal, ModalProps } from "react-bootstrap";

import './style.scss';

interface DetailModal extends ModalProps {
    title: string,
    content: ReactElement
}

const DetailModal = (props: DetailModal) => {
    const { title, content, ...modal_props } = props;

    return (
        <Modal
            {...modal_props}
            centered
            className="detail-modal"
            size="xl"
        >
            <Modal.Header closeButton>
                <h2 className="pt-sm heading-sm text-default">{title}</h2>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
        </Modal>
    )
}

export default DetailModal