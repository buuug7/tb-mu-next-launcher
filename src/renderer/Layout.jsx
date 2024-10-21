import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Toast,
  ToastContainer,
} from 'react-bootstrap';

import { copyRight, sitePrimaryTitle, SERVERS } from '../config';
import { UserContext } from './user-provider';
import useUserLogout from './use-user-logout';

function MyNavbar() {
  const { defaultServer, user } = useContext(UserContext);
  const logout = useUserLogout();

  return (
    <Navbar variant="light" bg="light" expand="md" fixed="top">
      <Container>
        <Navbar.Brand href="/">{sitePrimaryTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" navbarScroll>
            <Link to="/" className="nav-link">
              首页
            </Link>
            <Link to="/blog" className="nav-link">
              博客
            </Link>
            <Link to="/characters" className="nav-link">
              角色
            </Link>
            <Link to="/vip" className="nav-link">
              会员
            </Link>
            <Link to="/custom" className="nav-link">
              定制
            </Link>
            <Link to="/rank" className="nav-link">
              排行
            </Link>
            <Link to="/misc" className="nav-link">
              图鉴
            </Link>
          </Nav>

          <Nav>
            <NavDropdown title={defaultServer.name}>
              {SERVERS.map((item) => (
                <NavDropdown.Item
                  key={item.key}
                  onClick={() => {
                    // setCookie(DEFAULT_SERVER_KEY_NAME, item.key);
                    // signOut({ callbackUrl: '/' });
                  }}
                >
                  {item.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            {!user ? (
              <Link className="nav-link" to="/login">
                登录
              </Link>
            ) : (
              <>
                <NavDropdown title={user.memb___id}>
                  <Link to="/account" className="dropdown-item">
                    我的账号
                  </Link>
                  <NavDropdown.Divider />
                  <Link className="dropdown-item" onClick={logout}>
                    退出登录
                  </Link>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default function Layout({ children }) {
  const { message, updateMessage } = useContext(UserContext);

  return (
    <div className="layout">
      <header>
        <MyNavbar />
      </header>
      <main style={{ marginTop: '5rem' }}>
        <div className="container mt-4">
          {message && (
            <ToastContainer
              className="position-fixed p-3"
              position="bottom-center"
              style={{ zIndex: 9999 }}
            >
              <Toast
                onClose={() => {
                  updateMessage('');
                }}
                show={true}
                animation={false}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <strong className="me-auto">消息</strong>
                  <small>just now</small>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
              </Toast>
            </ToastContainer>
          )}
          <div>{children}</div>
          <div className="footer text-muted py-2">
            <p>{copyRight}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
