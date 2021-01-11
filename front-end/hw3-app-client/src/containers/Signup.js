import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";
var Parse = require("parse");
// var ParseReact = require('parse-react');

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
    const user = new Parse.User();
    user.set("password", fields.password);
    user.set("email", fields.email);
    user.set("username", fields.email);

    try {
      await user.signUp();
      console.log("user has been created.");
    } catch (error) {
      console.log(error.message);
    }

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
