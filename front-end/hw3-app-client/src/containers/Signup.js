import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./Signup.css";

import Parse from "../Parse.js";
// var ParseReact = require('parse-react');

export default function Signup() {
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();
  const [error, setError] = useState([]);
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

  function handleClose() {
    setError([]);
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
      userHasAuthenticated(true);
      Cookies.set("user", email);
      history.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      setError("Faild!");
    }

    //setIsLoading(true);

    //setNewUser("test");

    //setIsLoading(false);
  }

  return (
    <>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4" id="alert">
        {error.map((msg, index) => (
          <Alert variant="danger" key={index} onClose={handleClose} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            <p>{msg}</p>
          </Alert>
        ))}
      </div>
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
    </>
  );
}
