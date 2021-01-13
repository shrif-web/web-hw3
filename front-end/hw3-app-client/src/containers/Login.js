import React, { useState } from "react";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import Parse from "../Parse.js";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      history.push("/dashboard");
    } catch (error) {
      console.log("wrong email or password.");
    }
  }

  return (
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
  );
}
