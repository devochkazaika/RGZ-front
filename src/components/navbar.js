import React from 'react';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Nava extends React.Component{
  render(){
    const weight = {
      height: "50px"
    };
    return (
      <Navbar style={weight} expand="lg" className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Container>
        <Navbar.Brand href="#home">PC_SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link href="./pcs">PCs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="./pcs">Maths</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="./home">Home</Nav.Link>
            </Nav.Item>
          </Nav>
      </Container>
    </Navbar>
    );
  }
}

export default Nava;