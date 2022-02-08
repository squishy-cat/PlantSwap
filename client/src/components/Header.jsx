import React from "react";

import LoginForm from "./LoginForm";

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

function Header ( {show, onHideFunction, onClickFunction, currentUser, setCurrentUser} ) {
  return(
    <div>
      <Navbar
      {...onHideFunction} 
      bg="light" 
      expand="lg"
      >
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Button variant="primary" onClick={onClickFunction}>
                Please log in!
            </Button>
            <LoginForm
              show={show}
              onHideFunction={onHideFunction}
              onClickFunction={onClickFunction}

              currentUser = {currentUser}
              setCurrentUser = {setCurrentUser}
              >
            </LoginForm>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header;