import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

export const NavigationBar = ({ user, onLoggedOut, searchQuery, setSearchQuery}) => {

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }
    
  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Cody's Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <><Form className="form-inline">
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                    Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                    Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};