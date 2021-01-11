import React, { useState } from "react";
import { AppContext } from "./libs/contextLib";
import Routes from "./Routes";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function handleLogout() {
    userHasAuthenticated(false);
  }

  return (
    <div>
      <div className="App py-3">
        <Navbar
          collapseOnSelect
          bg="transparent"
          expand="sm"
          className="navbar-dark shadow mb-3"
          style={{ direction: "rtl" }}
        >
          <Navbar.Brand href="/" className="font-weight-bold">
            CherryTeam
            <img
              alt=""
              src="./logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top mr-2"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  variant="outline-primary"
                  className="nav-btn1"
                  size="sm"
                  href="/login"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline-primary"
                    className="nav-btn1"
                    size="sm"
                    href="/login"
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="nav-btn2"
                    size="sm"
                    href="/signup"
                  >
                    Signup
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
