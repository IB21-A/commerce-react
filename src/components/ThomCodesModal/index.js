import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ThomCodesModal = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate("/register");
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (document.referrer === "https://www.thomcodes.com/") {
      handleShow();
    }
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Welcome Recruiter or Hiring Manager!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>I see you're visiting via link from my portfolio site! </p>
          <p>
            Feel free to create an account by visiting the register link (You
            can make up an email address, as long as it ends in
            '@somedomain.com'), or you can reach out to me at{" "}
            <a href="mailto:Thom@thomcodes.com">Thom@thomcodes.com</a> and I'll
            send you personalized account!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Thanks!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThomCodesModal;
