import dayjs from 'dayjs';
import { useContext } from 'react';
import IconOnline from './icons/IconOnline';
import IconRank from './icons/IconRank';
import { classToName, getTotalPoints } from '../util';
import CharacterAvatar from './CharacterAvatar';
import { MuConfigContext } from './MuConfigProvider';

function CharacterRankCard({ item, index, onlineStatus }) {
  const { muConfig } = useContext(MuConfigContext);
  const roleName = classToName[item['Class']];
  const totalPoints = getTotalPoints(item, muConfig?.defaultClassInfo);
  return (
    <div>
      <div className="card-rank card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-start align-items-center">
            <div className="char-img me-1">
              <CharacterAvatar roleName={roleName} item={item} isRank />
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
          <div className="d-flex no-block align-items-center">
            <span>
              <h5>
                {roleName}{' '}
                <IconOnline online={onlineStatus?.ConnectStat === 1} />
              </h5>
              <small title="最后活动时间">
                {dayjs(onlineStatus['DisConnectTM']).format('YYYY/MM/DD HH:mm')}
              </small>
            </span>
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default function CharacterRankCardList({ users, userOnlineStatus }) {
  return (
    <div className="rank">
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
