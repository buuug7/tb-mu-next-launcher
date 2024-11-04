import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import IconOnline from './icons/IconOnline';
import IconRank from './icons/IconRank';
import CharacterAvatar from './CharacterAvatar';
import { getMetaByCharClass, getTotalPoints } from '../util';
import { MuConfigContext } from './MuConfigProvider';
import IconDoubleDown from './icons/IconDoubleDown';
import IconDoubleUp from './icons/IconDoubleUp';

import './CharacterRankCard.scss';

function CharacterRankCard({ item, index, onlineStatus }) {
  const [showExtra, setShowExtra] = useState(false);
  const { muConfig } = useContext(MuConfigContext);
  const charMeta = getMetaByCharClass(item['Class']);
  const totalPoints = getTotalPoints(item, muConfig);
  return (
    <div>
      <div className="CardRank card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-start align-items-center">
            <div className="char-img me-1">
              <CharacterAvatar item={item} isRank />
            </div>

            <div className="d-flex flex-column justify-content-start">
              <h4 className="mb-0" title={item['Name']}>
                {item['Name'].length > 6
                  ? item['Name'].slice(0, 6) + '..'
                  : item['Name']}
              </h4>
              <div>
                <small />
              </div>
            </div>
            <div className="ms-auto">
              <span className="display-6" style={{ fontSize: '2.2rem' }}>
                <IconRank /> {index + 1}
              </span>
            </div>
          </div>
        </div>

        <div className="card-body bg-light">
          <div className="d-flex no-block align-items-center justify-content-between">
            <span>
              <h5>
                {charMeta?.name}{' '}
                <IconOnline online={onlineStatus?.ConnectStat === 1} />
              </h5>
              <small title="最后活动时间">
                {dayjs(onlineStatus['DisConnectTM']).format('YYYY/MM/DD HH:mm')}
              </small>
            </span>

            <span
              style={{
                cursor: 'pointer',
                color: 'var(--bs-link-color)',
              }}
              onClick={() => {
                setShowExtra((preState) => !preState);
              }}
            >
              {showExtra ? <IconDoubleUp /> : <IconDoubleDown />}
            </span>
          </div>
        </div>

        {showExtra && (
          <div
            className="card-body"
            style={{ paddingBottom: 0, fontSize: '14px' }}
          >
            <div className="stats-row">
              <div className="stat-item">
                <h6>大师转生</h6> <i>{item['MasterResetCount']}</i>
              </div>
              <div className="stat-item">
                <h6>普通转生</h6> <i>{item['ResetCount']}</i>
              </div>
              <div className="stat-item">
                <h6>普通等级</h6> <i>{item['cLevel']}</i>
              </div>
              <div className="stat-item">
                <h6>大师等级</h6> <i>{item['MasterLevel']}</i>
              </div>
              <div className="stat-item">
                <h6>杀怪数量</h6> <i>{item['killMonster'] || 0}</i>
              </div>
              <div className="stat-item">
                <h6>杀人次数</h6> <i>{item['Kills']}</i>
              </div>
              <div className="stat-item">
                <h6>死亡次数</h6> <i>{item['Deads']}</i>
              </div>
              <div className="stat-item">
                <h6>总共点数</h6> <i>{totalPoints}</i>
              </div>
              <div className="stat-item">
                <h6>血色城堡</h6> <i>{item['bloodScore'] || 0}</i>
              </div>
              <div className="stat-item">
                <h6>恶魔广场</h6> <i>{item['devilSquareScore'] || 0}</i>
              </div>
              <div className="stat-item">
                <h6>赤色要塞</h6> <i>{item['chaoCastleScore'] || 0}</i>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CharacterRankCardList({ users, userOnlineStatus }) {
  return (
    <div className="RankCardList">
      {users.map((item, index) => (
        <CharacterRankCard
          item={item}
          key={item['Name'] + item['AccountID']}
          index={index}
          onlineStatus={
            userOnlineStatus.find((it) => it.memb___id === item.AccountID) || {}
          }
        />
      ))}
    </div>
  );
}
