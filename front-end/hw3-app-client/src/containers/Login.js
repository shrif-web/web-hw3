import React, { useState } from "react";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import Cookies from "js-cookie";
import "./Login.css";
import Parse from "../Parse.js";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    //
    // alert("log in!");

    try {
      const user = await Parse.User.logIn(email, password);
      console.log("login successfully");
      userHasAuthenticated(true);
      Cookies.set("user", email);
      history.push("/dashboard");
    } catch (error) {
      console.log("wrong email or password.");
      setError("wrong email or password");
    }
  }

  function handleClose() {
    setError([]);
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
      <div className="Login card">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
