import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([
    { subject: "post 1", text: "Hello", auth: "auth1" },
    { subject: "post 2", text: "Hello2", auth: "auth2" },
    { subject: "post 3", text: "Hello", auth: "auth3" },
  ]);
  return (
    <div className="Home">
      <div className="d-inline-block header">
        <img
          alt=""
          src="./logo.png"
          width="100"
          height="100"
          className="align-top mr-2"
        />
        Home Page
      </div>
      <div className="posts">
        <h1>Posts</h1>
        <div
          className="post row container mt-4"
          style={{ justifyContent: "center", margin: "auto" }}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
