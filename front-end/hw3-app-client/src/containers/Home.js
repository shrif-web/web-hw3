import React from "react";
import "./Home.css";

export default function Home() {
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
      </div>
    </div>
  );
}
