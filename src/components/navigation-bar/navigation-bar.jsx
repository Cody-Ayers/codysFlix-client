import { Navbar, Container, Nav, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const navStyle = {
  backgroundColor: "rgba(14,14,16,0.92)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid #2c2c33",
  padding: "0 0",
};

const brandStyle = {
  fontFamily: "Georgia, serif",
  fontSize: "1.35rem",
  color: "#f2efe9",
  textDecoration: "none",
};

const linkStyle = {
  color: "#a29d94",
  fontSize: "0.9rem",
  padding: "0 12px",
  textDecoration: "none",
  transition: "color 0.2s",
};

export const NavigationBar = ({ user, onLoggedOut, searchQuery, setSearchQuery }) => {
  return (
    <Navbar style={navStyle} sticky="top" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={brandStyle}>
          Cody's <span style={{ color: "#e8845c" }}>Flix</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-collapse" style={{ borderColor: "#2c2c33" }} />
        <Navbar.Collapse id="nav-collapse">
          <Nav className="ms-auto align-items-center gap-1">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" style={linkStyle}>Log in</Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ ...linkStyle, background: "#e8845c", color: "#0e0e10", borderRadius: "6px", padding: "6px 14px", fontWeight: 600 }}>Sign up</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Form className="d-flex me-2">
                  <Form.Control
                    type="text"
                    placeholder="Search movies…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: "180px", fontSize: "0.875rem" }}
                  />
                </Form>
                <Nav.Link as={Link} to="/" style={linkStyle}>Home</Nav.Link>
                <Nav.Link as={Link} to="/profile" style={linkStyle}>Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut} style={{ ...linkStyle, color: "#e8845c", cursor: "pointer" }}>Log out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
