import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";

import "./Signup.css";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    //setIsLoading(true);

    //setNewUser("test");

    //setIsLoading(false);
  }

  return (
    <div className="Signup card d-flex">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>

        <Button
          block
          size="lg"
          type="submit"
          varient="success"
          disabled={!validateForm()}
        >
          Signup
        </Button>
      </Form>
    </div>
  );
}
