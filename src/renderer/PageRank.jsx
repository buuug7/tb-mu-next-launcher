import { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import IconList from './icons/IconList';
import IconListGrid from './icons/IconListGrid';
import Layout from './Layout';
import CharacterRankList from './CharacterRankList';
import CharacterRankCardList from './CharacterRankCard';
import { getCharactersByPage, getUserOnlineStatus } from './api';

import './PageRank.scss';
import useErrorHandler from './use-error-handle';
import { MuConfigContext } from './MuConfigProvider';

/**
 * @typedef {{ConnectStat: string}} UserOnlineStatus
 */

function RankSkeleton() {
  return (
    <div className="skeletons">
      <div
        className="skeleton v1 d-block mb-3"
        style={{ width: '100%', height: '5rem' }}
      />
      <div
        className="skeleton v1 d-block mb-3"
        style={{ width: '50%', height: '1.5rem' }}
      />
      <div
        className="skeleton v1 d-block mb-3"
        style={{ width: '25%', height: '1.5rem' }}
      />
    </div>
  );
}

export default function PageRank() {
  const { muConfig } = useContext(MuConfigContext);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(
    muConfig?.rankOrderTypes?.[0] || {
      name: '默认',
      value: 'default',
    }
  );
  const [listType, setListType] = useState('table');
  const [userOnlineStatus, setUserOnlineStatus] = useState([]);

  const errorHandler = useErrorHandler();

  useEffect(() => {
    getUserOnlineStatus()
      .then(({ data }) => {
        setUserOnlineStatus(data);
      })
      .catch(errorHandler);
  }, [errorHandler]);

  useEffect(() => {
    setLoading(true);
    getCharactersByPage({
      page,
      order: order.value,
    })
      .then(({ data }) => {
        setUsers((state) => {
          if (page === 1) {
            return data.data;
          }
          return state.concat(data.data);
        });
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  }, [page, order, errorHandler]);

  const onlineUserIds = userOnlineStatus
    .filter((it) => it.ConnectStat === 1)
    .map((it) => it['memb___id']);

  return (
    <Layout>
      <div className="RankBanner" />
      <h3 className="text-center mb-4">
        <span>玩家排行榜</span>{' '}
        <span className="text-muted">
          <span>&lt;{onlineUserIds.length}</span> /{' '}
          <span>{userOnlineStatus.length}&gt;</span>
        </span>
      </h3>
      <div className="filter my-2 d-flex align-items-center justify-content-between">
        <div>
          {(muConfig?.rankOrderTypes || []).map((item) => (
            <Button
              variant={item.value === order.value ? 'outline-primary' : 'link'}
              size="sm"
              className="me-2"
              key={item.value}
              onClick={() => {
                setPage(1);
                setOrder(item);
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div>
          <div>
            <span
              onClick={() => setListType('table')}
              style={{
                cursor: 'pointer',
                padding: '4px',
                color: listType === 'table' ? 'var(--bs-primary)' : '',
              }}
            >
              <IconList />
            </span>
            <span
              onClick={() => setListType('card')}
              style={{
                cursor: 'pointer',
                padding: '4px',
                color: listType === 'card' ? 'var(--bs-primary)' : '',
              }}
            >
              <IconListGrid />
            </span>
          </div>
        </div>
      </div>

      {users.length <= 0 && (
        <div className="rank">
          <RankSkeleton />
          <RankSkeleton />
          <RankSkeleton />
          <RankSkeleton />
          <RankSkeleton />
          <RankSkeleton />
          <RankSkeleton />
          <RankSkeleton />
        </div>
      )}

      {listType === 'card' ? (
        <CharacterRankCardList
          users={users}
          userOnlineStatus={userOnlineStatus}
        />
      ) : (
        <CharacterRankList users={users} userOnlineStatus={userOnlineStatus} />
      )}

      <div className="my-3 text-center">
        <Button
          disabled={loading}
          variant="link"
          onClick={() => {
            setPage((pre) => pre + 1);
          }}
        >
          {loading ? '加载中...' : '加载更多'}
        </Button>
      </div>
    </Layout>
  );
}
