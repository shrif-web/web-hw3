import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Dashboard.css";

export default function Dashboard() {
  const [posts, setPosts] = useState([
    { subject: "post 1", text: "Hello" },
    { subject: "post 2", text: "Hello2" },
    { subject: "post 3", text: "Hello" },
    { subject: "post 1", text: "Hello" },
    { subject: "post 2", text: "Hello2" },
    { subject: "post 3", text: "Hello" },
  ]);
  const [newSubject, setNewSubject] = useState("");
  const [newText, setNewText] = useState("");

  function handleDelete() {
    //todo
  }

  function handleEdit(index) {
    console.log(index);
    //todo
  }

  function handleCreate() {
    //todo
  }

  function validateNewPost() {
    return newSubject.length > 0 && newText.length > 0;
  }

  function renderPosts() {
    if (posts.length === 0)
      return (
        <div className="card p-2">
          <h1>No posts yet!</h1>
        </div>
      );
    return posts.map((post, index) => (
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 p-2" key={index}>
        <div className="card" style={{ width: "auto" }}>
          <div className="card-body">
            <h3>{post.subject}</h3>
            {post.text}
            <p>
              <br />
              Published by: {post.auth}
            </p>
            <Button
              variant="outline-danger"
              className="m-1"
              onClick={handleDelete}
              size="sm"
              href="#"
            >
              Delete
            </Button>
            <Button
              variant="primary"
              className="m-1"
              size="sm"
              href="#"
              onClick={handleEdit}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="container">
      <h1>Your Posts</h1>
      <br />
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 mb-4">
        <Form onSubmit={handleCreate}>
          <Button
            className="mb-2"
            variant="success"
            disabled={!validateNewPost()}
            type="submit"
            size="sm"
            href="#"
          >
            CREATE NEW POST
          </Button>
          <Form.Group size="lg" controlId="newSubjetc">
            <Form.Control
              autoFocus
              value={newSubject}
              placeholder="New Subject"
              onChange={(e) => setNewSubject(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="newText">
            <Form.Control
              type="text"
              value={newText}
              placeholder="New Post Text"
              onChange={(e) => setNewText(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>
      <br />
      <div className="row" style={{ justifyItems: "center", margin: "auto" }}>
        {renderPosts()}
      </div>
      <br />
      <br />
    </div>
  );
}
