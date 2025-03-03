import dayjs from 'dayjs';
import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import IconRank from './icons/IconRank';
import { getTotalPoints } from '../util';
import CharacterAvatar from './CharacterAvatar';
import { MuConfigContext } from './MuConfigProvider';

function getUserOnlineStatus(userOnlineStatus, item) {
  return userOnlineStatus.find((it) => it.memb___id === item.AccountID) || {};
}

function OnlineStatus({ status }) {
  const lastOnlineTime = dayjs(status?.DisConnectTM).format('YYYY/MM/DD HH:mm');
  const onlineText = status?.ConnectStat === 1 ? '在线' : '离线';
  const onlineColor =
    status?.ConnectStat === 1 ? 'var(--bs-primary)' : 'var(--bs-gray)';
  return (
    <span
      style={{ color: onlineColor, cursor: 'pointer' }}
      title={`最后活动时间: ${lastOnlineTime}`}
    >
      {onlineText}
    </span>
  );
}

export default function CharacterRankList({ users, userOnlineStatus }) {
  const { muConfig } = useContext(MuConfigContext);
  return (
    <div>
      <Table responsive striped variant="default" className="rankTable">
        <thead>
          <tr>
            <th>排名</th>
            <th>角色名称</th>
            <th>在线状态</th>
            <th>大师转生</th>
            <th>普通转生</th>
            <th>普通等级</th>
            <th>大师等级</th>
            <th>杀怪数量</th>
            <th>杀人次数</th>
            <th>死亡次数</th>
            <th>总共点数</th>
            <th>血色城堡</th>
            <th>恶魔广场</th>
            <th>赤色要塞</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={item['Name']}>
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  <IconRank />
                  <span
                    style={{
                      color: index < 3 ? '#ffffff' : 'var(--bs-gray-800)',
                      backgroundColor: index < 3 ? 'var(--bs-purple)' : 'none',
                    }}
                    className="p-1"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-start align-items-center">
                  <CharacterAvatar item={item} isRank width={32} height={32} />
                  <span className="ms-2">{item['Name']}</span>
                </div>
              </td>
              <td>
                <OnlineStatus
                  status={getUserOnlineStatus(userOnlineStatus, item)}
                />
              </td>
              <td>{item['MasterResetCount']}</td>
              <td>{item['ResetCount']}</td>
              <td>{item['cLevel']}</td>
              <td>{item['MasterLevel'] || 0}</td>
              <td>{item['killMonster']}</td>
              <td>{item['Kills']}</td>
              <td>{item['Deads']}</td>
              <td>{getTotalPoints(item, muConfig)}</td>
              <td>{item['bloodScore'] || 0}</td>
              <td>{item['devilSquareScore'] || 0}</td>
              <td>{item['chaoCastleScore'] || 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
