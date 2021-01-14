import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./Dashboard.css";

import Parse from "../Parse.js";

export default function Dashboard() {
  var states = [];
  //  states = [
  //    { subject: " 1", text: "Hello" , id : 0 , auther:"me"},

  // { subject: "pst 3", text: "Hello" ,id:4 ,auther:"yoi"},];

  const [posts, setPosts] = useState(states);
  const [newSubject, setNewSubject] = useState("");
  const [newText, setNewText] = useState("");
  const [newAuther, setNewAuther] = useState("");

  function handleDelete(idx) {
    console.log(idx);

    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);

    const i = posts.findIndex((x) => x.id === idx);
    alert(i);
    query.get(idx).then(
      (post) => {
        console.log(post);
        post
          .destroy()

          .then(
            (myObject) => {
              posts.splice(i, 1);
              setPosts([...posts]);
              alert("deleted");
            },
            (error) => {
              alert("delete failed!");
            }
          );
      },
      (error) => {}
    );
  }

  function handleEdit(index) {
    console.log(index);
    //todo
  }

  function handleCreate() {
    const Post = Parse.Object.extend("Post");
    const mpost = new Post();

    mpost.set("subject", newSubject);
    mpost.set("text", newText);
    mpost.set("auther", Parse.User.current().getUsername());

    var name = "";

    mpost.save().then(
      (mpost) => {
        setPosts([
          ...posts,
          {
            subject: newSubject,
            text: newText,
            id: mpost.id,
            auther: Parse.User.current().getUsername(),
          },
        ]);
        alert("New object created with objectId: " + mpost.newSubject);
      },
      (error) => {
        alert("Failed to create new object, with error code: " + error.message);
      }
    );
  }

  function validateNewPost() {
    return newSubject.length > 0 && newText.length > 0;
  }

  useEffect(() => {
    const Post = Parse.Object.extend("Post");

    const query = new Parse.Query(Post);

    query.equalTo("auther", Parse.User.current().getUsername());

    query.find().then((resp) => {
      const ps = resp.map((x) => ({
        subject: x.get("subject"),
        text: x.get("text"),
        id: x.id,
        auther: x.get("auther"),
      }));
      setPosts(ps);
    });
  }, []);

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
            <h3 id="subject">{post.subject}</h3>
            {post.text}
            <p>
              <br />
              Published by: {post.auther}
            </p>
            <Button
              variant="outline-danger"
              className="m-1"
              onClick={function () {
                handleDelete(post.id);
              }}
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
            onClick={handleCreate}
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
