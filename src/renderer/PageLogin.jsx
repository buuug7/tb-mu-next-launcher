import { Form, Alert, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mySessionKey } from 'config';
import { login } from './api';
import { setCookie } from '../util';
import { setLocalStorageItem } from './use-my-session';
import Layout from './Layout';

export default function PageLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
                console.log(data);
                if (data) {
                  setLocalStorageItem(
                    mySessionKey,
                    JSON.stringify({
                      id: data['memb___id'],
                      name: data['memb_name'],
                      email: data['mail_addr'],
                    })
                  );

                  navigate('/');
                }
              })
              .catch((err) => {
                console.log(err);
                setMessage(err.response.data.message);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {loading ? 'loading...' : '登陆'}
        </Button>

        <Button variant="link" href="/register" className="ml">
          注册账号
        </Button>
      </Form>
    </Layout>
  );
}
