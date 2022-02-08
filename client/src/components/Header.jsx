import React from "react";
import "./Header.css"

import LoginForm from "./LoginForm";

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Image from 'react-bootstrap/Image'

import logo from '../assets/logo-seedling.jpg'

function Header(props) {

  if (props.currentUser===null) {
    return (
      <Navbar
        bg="light" 
        expand="lg"
        >
        <Container fluid>
          <Navbar.Brand href="home">
            <Image 
              src={logo} 
              alt="Logo" 
              className="logo" 
            />
            PlantSwap</Navbar.Brand>
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
            <Button 
              variant="success" 
              onClick={props.onClickFunction}
              className="mx-2"
            >
              Log in!
            </Button>
            <LoginForm
              show={props.show}
              setModalShow={props.setModalShow}
              onHideFunction={props.onHideFunction}
              setCurrentUser = {props.setCurrentUser}
            >
            </LoginForm>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
  
return(
    <div>
        <Navbar
        bg="light" 
        expand="lg"
        {...props}
        >
          <Container fluid>
            <Navbar.Brand 
              href="home"
            >
              <Image 
                src={logo} 
                alt="Logo" 
                className="logo"
              />
              PlantSwap
            </Navbar.Brand>
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
                <Button 
                  variant="outline-success"
                >
                  Search
                </Button>
              </Form>
            <Button 
              onClick={props.handleLogout}
              className="mx-2"
              variant="success"
            >
              Log out
            </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  } 

export default Header;