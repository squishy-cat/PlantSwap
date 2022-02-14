import { React, useState } from "react";
import "./Header.css"

import LoginForm from "./LoginForm";
import NewPlant from "./NewPlant";

import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap'

import logo from '../assets/logo-seedling.jpg'

function Header({ currentUser, setCurrentUser, handleLogout, getPlants }) {

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

  const goToProfile = (e) => {
    e.preventDefault();
    window.location.href='/profile/me'
  }

  if (currentUser===null) {
    return (
      <Navbar
        bg="light" 
        expand="lg"
        sticky="top"
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
              {/* <Nav.Link href="plants" disabled>My Plants</Nav.Link> */}
              <Nav.Link href="/trades" disabled>My Trades</Nav.Link>
              <Nav.Link href="/profile/me" disabled>My Profile</Nav.Link>
            </Nav>
            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
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
              setCurrentUser = {setCurrentUser}
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
          sticky="top"
        >
        <Container fluid>
          <Navbar.Brand href="/">
            <Image 
              src={logo} 
              alt="Logo" 
              className="logo" 
            />
            PlantSwap
          </Navbar.Brand>
          <Button
            variant="outline-success"
            onClick={showNewPlant}
          >
            Add Plant
          </Button>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href={`/trades/${currentUser.id}`}>My Trades</Nav.Link>
              <Nav.Link onClick={goToProfile}>My Profile</Nav.Link>
              <NewPlant 
                show={newPlantModal}
                setShow={setNewPlantModal}
                onHide={hideNewPlant}
                currentUser={currentUser.id}
                getPlants={getPlants}
              />
            </Nav>
            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <Button 
              onClick={handleLogout}
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