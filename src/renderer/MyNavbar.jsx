import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import useUserLogout from './use-user-logout';
import { UserContext } from './UserProvider';
import { MuConfigContext } from './MuConfigProvider';

export default function MyNavbar() {
  const { user } = useContext(UserContext);
  const { muConfig, defaultServer } = useContext(MuConfigContext);
  const logout = useUserLogout();
  const currentServer = defaultServer || muConfig?.servers?.[0] || [];

  return (
    <Navbar variant="light" bg="light" expand="md" fixed="top">
      <Container>
        <Navbar.Brand href="/">{muConfig.sitePrimaryTitle}</Navbar.Brand>
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
            {/* <Link to="/misc" className="nav-link">
              图鉴
            </Link> */}
          </Nav>

          <Nav>
            <NavDropdown title={currentServer.name}>
              {(muConfig?.servers || []).map((item) => (
                <NavDropdown.Item
                  disabled
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
                  <Link to="/setting" className="dropdown-item">
                    更多设置
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
