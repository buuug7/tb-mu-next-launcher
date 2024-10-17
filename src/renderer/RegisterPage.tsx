/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable promise/catch-or-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { getBaseUrl } from 'config';
import { validateEmail } from '../util';
import http from '../http';

export default function RegisterPage() {
  const history = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="mt-4 container">
        <h5 className="mb-3">用户注册</h5>
        <hr />

        {message && (
          <div role="alert" className="fade alert alert-danger show">
            {message}
          </div>
        )}

        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              用户名
            </label>
            <input
              placeholder="请输入你的用户名"
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              邮箱
            </label>
            <input
              placeholder="请输入邮箱"
              type="text"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              密码
            </label>
            <input
              placeholder="请输入密码"
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="passwordConfirm">
              确认密码
            </label>
            <input
              placeholder="请输入确认密码"
              type="password"
              id="passwordConfirm"
              className="form-control"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
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

              http
                .post(`${getBaseUrl()}/api/register`, {
                  username,
                  email,
                  password,
                })
                .then(() => {
                  alert('注册成功');
                  setMessage('');
                  // router.replace('/api/auth/signin').then(() => {});
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
            {loading ? 'loading...' : '注册'}
          </button>
          <a role="button" href="/api/auth/signin" className="ml btn btn-link">
            登录
          </a>
          <button
            type="submit"
            className="btn btn-link me-2"
            onClick={() => {
              history(-1);
            }}
          >
            返回
          </button>
        </form>
      </div>
    </div>
  );
}
