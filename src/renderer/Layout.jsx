import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import { copyRight, sitePrimaryTitle, SERVERS, mySessionKey } from '../config';
import { UserContext } from './user-provider';
import { HTTP_CUSTOM_EXCEPTION } from './MyCustomEvent';
import MyNavbar from './MyNavbar';
import useUserLogout from './use-user-logout';

export default function Layout({ children }) {
  const { message, updateMessage, notifyUserDataChange } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const callback = (event) => {
      console.log(HTTP_CUSTOM_EXCEPTION, event);
      const error = event.detail;
      const status = error?.response?.status;
      const requestURL = error?.config?.url;

      if (status === 401 && requestURL?.includes('/mu/api/login')) {
        window.localStorage.removeItem(mySessionKey);
        notifyUserDataChange({ clean: true });
        navigate('/login');
      }
    };
    window.addEventListener(HTTP_CUSTOM_EXCEPTION, callback);
    return () => window.removeEventListener(HTTP_CUSTOM_EXCEPTION, callback);
  });

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
                show
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
