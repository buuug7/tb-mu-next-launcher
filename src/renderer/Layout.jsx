import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import { mySessionKey } from '../config';
import { UserContext } from './UserProvider';
import { HTTP_CUSTOM_EXCEPTION } from './MyCustomEvent';
import { MessageContext } from './MessageProvider';
import { MuConfigContext } from './MuConfigProvider';
import MyNavbar from './MyNavbar';

export default function Layout({ children }) {
  const { muConfig } = useContext(MuConfigContext);
  const { notifyUserDataChange } = useContext(UserContext);
  const { message, updateMessage } = useContext(MessageContext);
  const navigate = useNavigate();

  useEffect(() => {
    const callback = (event) => {
      console.log(HTTP_CUSTOM_EXCEPTION, event);
      const error = event.detail;
      const status = error?.response?.status;
      const requestURL = error?.config?.url;

      if (status === 401 && !requestURL?.includes('/mu/api/login')) {
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
            <p>{muConfig.copyRight}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
