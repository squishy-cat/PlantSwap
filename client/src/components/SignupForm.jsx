import React, { useState } from "react";

import { Button, Form } from 'react-bootstrap';

import "./Signup.css"

const SignupForm = ( {setCurrentUser, setModalShow} ) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const userCreds = { ...formData };

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
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
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="name">Name:</Form.Label>
        <Form.Control
          id="name-signup-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Control
          id="email-signup-input"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          id="password-signup-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button 
        type="submit"
        className="mt-2"
        variant="success"
      >
        Submit
      </Button>
      <div>
        {errors ? errors.map(error => <p  id="error-message">{error}</p>) : null}
      </div>
    </Form>
  );
};

export default SignupForm;