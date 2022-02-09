import React, { useState } from "react";

import { Modal, Button, Form } from 'react-bootstrap';

import SignupForm from "./SignupForm";

function LoginForm(props) {
  const [signUp, setSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { show, ...rest } = props

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
          rest.setCurrentUser(user);
          rest.setModalShow(false);
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  };

  if (signUp===false) {
    return (
      <Modal
        show = {show}
        {...rest} 
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
            onClick={rest.onHideFunction}
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
      setSignUp={setSignUp}
      {...rest}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Please Sign Up!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignupForm 
          setCurrentUser = {rest.setCurrentUser}
          setModalShow = {rest.setModalShow}
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