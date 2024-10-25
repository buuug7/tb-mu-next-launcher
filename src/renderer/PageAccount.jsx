import dayjs from 'dayjs';
import { useState, useContext } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { getVipItem } from '../util';
import { UserContext } from './UserProvider';
import { changePassword, updateUserData } from './api';
import Layout from './Layout';
import AccessDenied from './AccessDenied';
import useUserLogout from './use-user-logout';
import IconAlert from './icons/IconAlert';
import useErrorHandler from './use-error-handle';
import { MuConfigContext } from './MuConfigProvider';
import { MessageContext } from './MessageProvider';

function MyInformation() {
  const { user, notifyUserDataChange } = useContext(UserContext);
  const { updateMessage } = useContext(MessageContext);
  const [name, setName] = useState(user.memb_name);
  const [email, setEmail] = useState(user.mail_addr);
  const [loading, setLoading] = useState(false);

  const errorHandler = useErrorHandler();

  return (
    <div className="myInformation p-3 bg-white">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>用户名</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>邮箱</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="outline-primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setLoading(true);
            updateUserData({
              name,
              email,
            })
              .then(() => {
                updateMessage('更新成功');
                notifyUserDataChange();
              })
              .catch(errorHandler)
              .finally(() => setLoading(false));
          }}
        >
          {loading ? 'Loading' : '更新资料'}
        </Button>
      </Form>
    </div>
  );
}

function ChangePasswordComponent() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { updateMessage } = useContext(UserContext);

  const logout = useUserLogout();
  const errorHandler = useErrorHandler();

  return (
    <div className="changePassword p-3 bg-white">
      {message && <Alert variant="danger">{message}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>旧密码</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>新密码</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          disabled={loading}
          variant="outline-primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (!oldPassword || !newPassword) {
              setMessage('旧密码或者新密码不能为空');
              return;
            }

            setLoading(true);
            changePassword({
              oldPassword,
              newPassword,
            })
              .then(() => {
                updateMessage('密码修改成功, 请重新登录!');
                logout();
              })
              .catch(errorHandler)
              .finally(() => setLoading(false));
          }}
        >
          {loading ? 'loading' : '修改密码'}
        </Button>
      </Form>
    </div>
  );
}

export function AccountInfo() {
  const { muConfig } = useContext(MuConfigContext);
  const { user } = useContext(UserContext);
  const isBlocked = user.bloc_code !== '0';
  const userAccount = user.id;
  const jf = user.WCoinP;
  const applyDays = user.appl_days;
  const messageOk = <div>你当前的账号正常!</div>;

  const messageBlocked = (
    <div>
      <p>
        <IconAlert />
        <span>当前账号异常, 请联系管理员修复</span>
      </p>
    </div>
  );

  const vipItem = getVipItem(user, muConfig?.vips || []);

  return (
    <Alert variant={isBlocked ? 'danger' : 'primary'}>
      <h4 className="alert-heading">{userAccount}</h4>
      <p>
        账号注册日期 <i>{dayjs(applyDays).format('YYYY/MM/DD HH:mm')}</i>,
        当前积分 <i>{jf}</i>, 您的会员信息为{' '}
        <i style={{ color: 'red' }}>{vipItem.name}</i>, 到期时间{' '}
        <i>{dayjs(user.AccountExpireDate).format('YYYY/MM/DD HH:mm')}</i>.
      </p>
      <hr />
      <div>{isBlocked ? messageBlocked : messageOk}</div>
    </Alert>
  );
}

export default function PageAccount() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <AccessDenied />;
  }

  return (
    <Layout>
      <h5 className="mb-3">账号状态</h5>
      {user && <AccountInfo />}

      <h5 className="mb-3">个人资料</h5>
      <Row className="mb-3">
        <Col lg={6}>
          <MyInformation />
        </Col>
      </Row>

      <h5 className="mb-3">修改密码</h5>
      <Row className="mb-3">
        <Col lg={6}>
          <ChangePasswordComponent />
        </Col>
      </Row>
    </Layout>
  );
}
