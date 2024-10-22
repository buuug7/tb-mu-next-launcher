import { Form, Alert, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../util';
import Layout from './Layout';
import { register } from './api';
import MySwal from './MySwal';

export default function PageRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <Layout>
      <h5 className="mb-3">用户注册</h5>
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>邮箱</Form.Label>
          <Form.Control
            type="text"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>密码</Form.Label>
          <Form.Control
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>确认密码</Form.Label>
          <Form.Control
            type="password"
            placeholder="请输入确认密码"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
        </Form.Group>

        <Button
          disabled={loading}
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            if (!username || !password || !email) {
              setMessage('用户名, 密码, 邮箱不能为空');
              return;
            }

            if (!validateEmail(email)) {
              setMessage('邮箱格式不正确');
              return;
            }

            if (password.length < 4) {
              setMessage('密码长度不能小于4位数');
              return;
            }

            if (password !== passwordConfirm) {
              setMessage('确认密码不一致');
              return;
            }

            if (username.length > 10) {
              setMessage('用户名不能大于10个字符');
              return;
            }

            if (password.length > 10) {
              setMessage('密码长度不能大于10个字符');
              return;
            }

            setLoading(true);

            register({
              username,
              email,
              password,
            })
              .then(() => {
                MySwal.message(`注册成功`);
                navigate('/login');
              })
              .catch((err) => {
                console.log(err);
                setMessage(err?.response?.data?.message);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {loading ? 'loading...' : '注册'}
        </Button>

        <Link variant="link" to="/login" className="btn btn-link ml">
          登录
        </Link>
      </Form>
    </Layout>
  );
}
