import { React, useEffect, useState } from "react";
import "./Header.css"

import LoginForm from "./LoginForm";
import NewPlant from "./NewPlant";

import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl, Image } from 'react-bootstrap'

import logo from '../assets/logo-seedling.jpg'

function Header(props) {

  const [modalShow, setModalShow] = useState(false);
  const [newPlantModal, setNewPlantModal] = useState(false);

  const onClickFunction = () => {
    setModalShow(true)
  }

  const onHideFunction = () => {
    setModalShow(false)
  }

  const showNewPlant = () => {
    setNewPlantModal(true)
  }

  const hideNewPlant = () => {
    setNewPlantModal(false)
  }

  if (props.currentUser===null) {
    return (
      <Navbar
        bg="light" 
        expand="lg"
        >
        <Container fluid>
          <Navbar.Brand href="/">
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
              <Nav.Link href="#" disabled>My Plants</Nav.Link>
              <Nav.Link href="#" disabled>My Trades</Nav.Link>
              <NavDropdown title="My Profile" id="navbarScrollingDropdown" disabled>
                <NavDropdown.Item href="/profile">View</NavDropdown.Item>
                <NavDropdown.Item href="/profile/edit">Edit</NavDropdown.Item>
              </NavDropdown>
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
              onClick={onClickFunction}
              className="mx-2"
            >
              Log in!
            </Button>
            <LoginForm
              show={modalShow}
              setModalShow={setModalShow}
              onHideFunction={onHideFunction}
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
        >
        <Container fluid>
          <Navbar.Brand href="/">
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
              <Nav.Link href="#action1">My Plants</Nav.Link>
              <Nav.Link href="#action2">My Trades</Nav.Link>
              <NavDropdown title="My Profile" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">View</NavDropdown.Item>
                <NavDropdown.Item href="/profile/edit">Edit</NavDropdown.Item>
              </NavDropdown>
              <Button
                variant="outline-success"
                onClick={showNewPlant}
              >Add Plant
              </Button>
              <NewPlant 
                show={newPlantModal}
                setShow={setNewPlantModal}
                onHide={hideNewPlant}
                currentUser={props.currentUser.id}
                getPlants={props.getPlants}
              />
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