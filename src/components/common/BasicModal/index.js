import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/* 
	Has default values but can take in customized text.
	showModal is a boolean provided by the parent component. It should be receive a "true" to trigger the useEffect and pop up.
	Provide a handleConfirm function so it knows what to do when confirmed 
*/

function BasicModal({
	showModal,
	setShowModal,
	handleConfirm,
	title = "Are you sure?",
	body = "Please confirm",
	cancelButtonText = "Cancel",
	confirmButtonText = "Confirm",
}) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const doConfirm = () => {
		handleClose();
		handleConfirm();
	};

	useEffect(() => {
		const handleShow = () => setShow(true);

		if (showModal) {
			handleShow();
			setShowModal(false);
		}
	}, [showModal, setShowModal]);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{body}</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						{cancelButtonText}
					</Button>
					<Button variant="danger" onClick={doConfirm}>
						{confirmButtonText}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}



export default BasicModal;
