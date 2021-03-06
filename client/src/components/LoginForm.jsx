import React, { useState } from "react";

import { Modal, Button, Form } from 'react-bootstrap';

import "./Login.css"

import SignupForm from "./SignupForm";

function LoginForm({ show, setModalShow, onHideFunction, setCurrentUser }) {
  const [signUp, setSignUp] = useState(false)
  const [errors, setErrors] = useState()
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleClose = () => {
    onHideFunction();
    setFormData({
      name: "",
      password: "",
    });
    setErrors();
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setModalShow(false);
        });
      } else {
        res.json().then((errors) => {
          setErrors(errors);
        });
      }
    });
  };

  if (signUp===false) {
    return (
      <Modal
        show = {show} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Please login!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3"> 
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control
                  id="name-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="password">Password:</Form.Label>
                <Form.Control
                  id="password-input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              <div>
                {errors ? <div id="error-message"> {errors.error} </div> : null}
              </div>
              </Form.Group>
              <Button 
                type="submit" 
                variant="success"
              >
                Submit
              </Button>
              <Button 
                onClick={() => setSignUp(true)}
                variant="warning"
                className="mx-2"
              >
                Sign up
              </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={handleClose}
            variant="outline-success"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      );
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={signUp}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Please Sign Up!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignupForm 
          setCurrentUser = {setCurrentUser}
          setModalShow = {setModalShow}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={() => setSignUp(false)}
          variant="outline-success"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default LoginForm;