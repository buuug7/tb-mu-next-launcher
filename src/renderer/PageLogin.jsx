import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Alert, Button } from 'react-bootstrap';
import { mySessionKey } from 'config';
import { login } from './api';
import { setLocalStorageItem } from './MyCustomEvent';
import Layout from './Layout';
import useErrorHandler from './use-error-handle';

export default function PageLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();

  return (
    <Layout>
      <h5 className="mb-3">用户登录</h5>
      <hr />
      {message && <Alert variant="danger">{message}</Alert>}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>用户名</Form.Label>
          <Form.Control
            type="text"
            placeholder="请输入你的用户名"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>密码</Form.Label>
          <Form.Control
            placeholder="请输入密码"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          disabled={loading}
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (!username || !password) {
              setMessage('用户名跟密码不能为空');
              return;
            }

            setLoading(true);
            login({ username, password })
              .then(({ data }) => {
                if (data) {
                  setLocalStorageItem(mySessionKey, data.access_token);
                  navigate('/characters');
                }
              })
              .catch(errorHandler)
              .finally(() => setLoading(false));
          }}
        >
          {loading ? 'loading...' : '登陆'}
        </Button>

        <Link variant="link" to="/register" className="btn btn-link ml">
          注册账号
        </Link>
      </Form>
    </Layout>
  );
}
