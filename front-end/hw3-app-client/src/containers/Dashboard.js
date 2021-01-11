import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Dashboard.css";

export default function Dashboard() {
  const [posts, setPosts] = useState([
    { id: "1", subject: "post 1", text: "Hello", auth: "auth1" },
    { id: "2", subject: "post 2", text: "Hello2", auth: "auth2" },
    { id: "3", subject: "post 3", text: "Hello", auth: "auth3" },
    { id: "4", subject: "post 3", text: "Hello", auth: "auth3" },
    { id: "5", subject: "post 3", text: "Hello", auth: "auth3" },
  ]);

  function handleDelete() {
    //todo
  }

  function handleEdit() {
    //todo
  }

  function handleCreate() {
    //todo
  }

  return (
    <div className="container">
      <Button
        variant="success"
        className="m-1 m-4"
        onClick={handleCreate}
        size="sm"
        href="#"
      >
        CREATE NEW POST
      </Button>
      <div
        className="row container"
        style={{ justifyItems: "center", margin: "auto" }}
      >
        {posts.map((post, index) => (
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 p-2">
            <div className="card">
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
        ))}
      </div>
    </div>
  );
}
