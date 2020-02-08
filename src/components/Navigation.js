import React from 'react'

// Style Component 
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {

    return (
        <div>
            <Navbar fixed="top" bg="light" variant="light">
                <Navbar.Brand href="#">GooeyApp</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#">Quotes</Nav.Link>
                    <Nav.Link href="#">Combat</Nav.Link>
                    <Nav.Link href="#">Handouts</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Navigation