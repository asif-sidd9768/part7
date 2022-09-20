import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import './Menu.styles.css'

const Menu = ({ user, logoutHandler }) => {

  const paddingMenu = {
    padding: 5
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" style={paddingMenu}>
        <Navbar.Brand>Bloggers-Dem</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link className="padding-menu-link" to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link className="padding-menu-link" to="/users">
                users
              </Link>
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link>
              <span>{user.name}</span> logged in <button onClick={() => logoutHandler()}>logout</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <a href="#"><span>{user.name}</span> logged in <button>logout</button></a> */}
    </div>
  )
}

// onClick={() => logoutHandle()}
export default Menu
