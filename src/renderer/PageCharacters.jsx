import dayjs from 'dayjs';
import { Alert } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import Layout from './Layout';
import AccessDenied from './AccessDenied';
import CharacterCard from './CharacterCard';
import { getVipItem } from '../util';
import { UserContext } from './UserProvider';
import { getCharacterByUsername } from './api';

import './PageCharacters.scss';
import { MuConfigContext } from './MuConfigProvider';
import useErrorHandler from './use-error-handle';

export default function PageCharacters() {
  const { muConfig } = useContext(MuConfigContext);
  const { user } = useContext(UserContext);
  const [characters, setCharacters] = useState([]);
  const errorHandler = useErrorHandler();

  useEffect(() => {
    if (!user) {
      return;
    }

    getCharacterByUsername(user['memb___id'])
      .then(({ data }) => {
        setCharacters(data);
      })
      .catch(errorHandler);
  }, [user, errorHandler]);

  if (!user) {
    return <AccessDenied />;
  }

  const vipItem = getVipItem(user, muConfig?.vips || []);

  return (
    <Layout>
      <Alert variant="primary">
        <h4 className="alert-heading">
          {user.memb___id.toUpperCase()} &lt;{user.memb_name}&gt;
        </h4>
        <div>
          账号注册日期{' '}
          <i>{dayjs(user['appl_days']).format('YYYY/MM/DD HH:mm')}</i>, 当前积分{' '}
          <i className="text-danger">{user['WCoinP']}</i>, 当前元宝为{' '}
          <i className="text-danger">{user['WCoinC']}</i>, 您的会员信息为{' '}
          <i className="text-danger">{vipItem?.name}</i>, 到期时间{' '}
          <i>{dayjs(user['AccountExpireDate']).format('YYYY/MM/DD HH:mm')}</i>.
        </div>
      </Alert>

      <h5 className="mb-3 title-1">
        <span title="角色管理">角色管理</span>
      </h5>

      <div className="characters mb-5">
        {characters.map((item) => (
          <CharacterCard
            item={item}
            key={item.Name}
            onRefresh={() => {
              getCharacterByUsername(user['memb___id']).then(({ data }) => {
                setCharacters(data);
              });
            }}
          />
        ))}
      </div>
    </Layout>
  );
}
