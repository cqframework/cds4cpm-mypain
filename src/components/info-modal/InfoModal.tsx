import React from 'react';
import './InfoModal.css';
import { Button, Modal } from 'react-bootstrap';
import { faCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class InfoModal extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            redirect: false
        };
    }



    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    confirm = () => {
        console.log('props:', this.props)
        this.props.onSubmit();
    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <p tabIndex={0}>Click the submit button below to send this information to your doctor and your care team. Please be sure to check in with your provider to see if they have accessed PainManager to review your MyPAIN materials.</p>
                        <p tabIndex={0}>For additional assistance with MyPAIN or questions about your upcoming appointment, please contact your health care provider.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" className="submit-button" onClick={this.confirm}> <FontAwesomeIcon icon={faCheck} aria-label="submit questionnaire" /> Submit </Button>
                        <Button variant="danger" className="close-button" onClick={this.handleClose}> <FontAwesomeIcon icon={faWindowClose} aria-label="cancel questionnaire submission"/> Cancel </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
