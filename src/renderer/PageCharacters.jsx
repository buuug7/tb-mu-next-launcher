import dayjs from 'dayjs';
import { Alert } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import Layout from './Layout';
import AccessDenied from './AccessDenied';
import CharacterCard from './CharacterCard';
import { getVipItem } from '../util';
import { UserContext } from './user-provider';
import { getCharacterByUsername } from './api';

import './PageCharacters.scss';

export default function PageCharacters() {
  const { user, updateMessage } = useContext(UserContext);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    getCharacterByUsername(user['memb___id'])
      .then(({ data }) => {
        setCharacters(data);
      })
      .catch((err) => {
        console.log(err);
        updateMessage(err.response.data.error);
      });
  }, [user, updateMessage]);

  if (!user) {
    return <AccessDenied />;
  }

  const vipItem = getVipItem(user);

  return (
    <Layout>
      <Alert variant="primary">
        <h4 className="alert-heading">
          {user.memb___id.toUpperCase()} &lt;{user.memb_name}&gt;
        </h4>
        <div>
          账号注册日期{' '}
          <i>{dayjs(user['appl_days']).format('YYYY/MM/DD HH:mm')}</i>, 当前积分{' '}
          <b style={{ color: 'green' }}>{user['WCoinP']}</b>, 当前元宝为{' '}
          <b style={{ color: 'red' }}>{user['WCoinC']}</b>, 您的会员信息为{' '}
          <b style={{ color: 'red' }}>{vipItem?.name}</b>, 到期时间{' '}
          <i>{dayjs(user['AccountExpireDate']).format('YYYY/MM/DD HH:mm')}</i>.
        </div>
      </Alert>

      <h5 className="mb-3 title-1">
        <span title="角色管理">角色管理</span>
      </h5>

      <div className="characters mb-5">
        {characters.map((item) => (
          <CharacterCard item={item} key={item['Name']} />
        ))}
      </div>
    </Layout>
  );
}
