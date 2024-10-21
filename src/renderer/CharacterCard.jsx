/* eslint-disable no-restricted-globals */

import { useContext, useState } from 'react';
import {
  Card,
  Form,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Popover,
  Button,
} from 'react-bootstrap';

import {
  classToName,
  getCharacterAbbr,
  getInventoryItemByIndex,
  getTotalPoints,
  randomPick,
  replaceAt,
} from '../util';
import {
  CAN_RESET_LIFE,
  CUSTOM_TITLE_ENABLE,
  EXT1_ENABLE,
  PRIZE1,
  PRIZE_1_NEED_RESET_COUNT,
  RECYCLE_CHARACTER_YB,
  RECYCLE_CHARACTER_LEVEL,
  RESET_LIFT_MAX_COUNT,
  RESET_LIFT_REQUIRE_LEVEL,
  RECYCLE_CHARACTER_RESET_COUNT,
  ENABLE_ADD_POINTS,
} from '../config';
import http from '../http';

import CharacterAvatar from './CharacterAvatar';
import Ext1Custom from './Ext1Custom';
import CustomTitle from './CustomTitle';
import CharacterRename from './CharacterRename';
import { UserContext } from './user-provider';
import { getMyData } from './api';

/**
 *
 * @param item {UserCharacter}
 * @returns {JSX.Element}
 */

export default function CharacterCard({ item }) {
  const { updateMessage, defaultServer } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [Strength, setStrength] = useState(item['Strength']);
  const [Dexterity, setDexterit] = useState(item['Dexterity']);
  const [Vitality, setVitality] = useState(item['Vitality']);
  const [Energy, setEnergy] = useState(item['Energy']);
  const [LevelUpPoint, setLevelUpPoint] = useState(item['LevelUpPoint']);
  const [showChangeNameModal, setShowChangeNameModal] = useState(false);

  const totalPoints = getTotalPoints(item);
  const roleName = classToName[item['Class']];

  const resetLifeFn = () => {
    if (loading) {
      return;
    }

    const resetLife = item['ResetLife'];
    const cLevel = item['cLevel'];

    if (resetLife >= RESET_LIFT_MAX_COUNT) {
      updateMessage('你已经满转了');
      return;
    }

    if (cLevel < RESET_LIFT_REQUIRE_LEVEL) {
      updateMessage(`当前角色等级不到 ${RESET_LIFT_REQUIRE_LEVEL}`);
      return;
    }

    setLoading(true);
    http
      .post(`/api/users/resetLife`, {
        username: item['AccountID'],
        characterName: item['Name'],
      })
      .then((r) => {
        console.log(r.data);
        updateMessage('成功转职');
        setTimeout(() => {
          location.reload();
        }, 200);
      })
      .catch((err) => {
        console.log(err.response.data);
        updateMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const to3Zhuan = () => {
    if (loading) {
      return;
    }

    const confirmFn = confirm('确定要转职?');

    if (!confirmFn) {
      return;
    }

    if (![1, 17, 33, 48, 64, 81, 96].includes(item['Class'])) {
      updateMessage('只有二转职业才能进行快速三转');
      return;
    }

    setLoading(true);
    http
      .post(`/api/users/zhuanZhi3`, {
        username: item['AccountID'],
        characterName: item['Name'],
      })
      .then(() => {
        updateMessage('成功3次转职');
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        updateMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const backTo2Zhuan = () => {
    if (loading) {
      return;
    }
    const confirmFn = confirm(
      '你确定要恢复到二转吗?恢复2转请取下三代翅膀,不然会丢失'
    );

    if (!confirmFn) {
      return;
    }

    if (![3, 19, 35, 83, 50, 66].includes(item['Class'])) {
      updateMessage('貌似你还没有三转');
      return;
    }

    setLoading(true);
    http
      .post(`/api/users/backTo2Zhuan`, {
        username: item['AccountID'],
        characterName: item['Name'],
      })
      .then((r) => {
        console.log(r.data);
        updateMessage('成功恢复到二转');
        // setTimeout(() => {
        //   location.reload();
        // }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        updateMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearPoints = () => {
    if (loading) {
      return;
    }

    setLoading(true);

    http
      .post(`/api/users/resetUserPoints`, {
        username: item['AccountID'],
        characterName: item['Name'],
      })
      .then((r) => {
        console.log(r.data);
        updateMessage('洗点成功');
        // setTimeout(() => {
        //   location.reload();
        // }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        updateMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addPoints = () => {
    if (loading) {
      return;
    }

    if (!ENABLE_ADD_POINTS) {
      return;
    }

    if (LevelUpPoint < 0) {
      updateMessage('剩余点数不能为负数');
      return;
    }

    setLoading(true);
    http
      .post(`/api/users/addPoints`, {
        username: item['AccountID'],
        characterName: item['Name'],
        Strength: Strength,
        Dexterity: Dexterity,
        Vitality: Vitality,
        Energy: Energy,
      })
      .then((r) => {
        console.log(r.data);
        updateMessage('加点成功');
        // setTimeout(() => {
        //   location.reload();
        // }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        updateMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const meHelp = () => {
    if (loading) {
      return;
    }
    const confirmFn = confirm('你确定要进行自救吗？');

    if (!confirmFn) {
      return;
    }

    setLoading(true);
    http
      .post(`/api/users/meHelp`, {
        username: item['AccountID'],
        characterName: item['Name'],
      })
      .then((r) => {
        console.log('r1=', r.data);
        updateMessage('成功自救');
        // setTimeout(() => {
        //   location.reload();
        // }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        updateMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteCharacter = () => {
    if (loading) {
      return;
    }
    const confirmFn = confirm('删除的角色无法恢复, 你确定要删除该角色吗？');

    if (!confirmFn) {
      return;
    }

    setLoading(true);

    http
      .post(`/api/users/deleteCharacter`, {
        username: item['AccountID'],
        characterName: item.Name,
      })
      .then((r) => {
        console.log(r.data);
        updateMessage('成功删除角色');
        // setTimeout(() => {
        //   location.reload();
        // }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        updateMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const recycleCharacter = () => {
    if (loading) {
      return;
    }
    const confirmFn = confirm(
      `回收角色需要 ${RECYCLE_CHARACTER_LEVEL} 等级, 回收将获得 ${RECYCLE_CHARACTER_YB} 元宝, 你确定要回收该角色吗？`
    );

    if (!confirmFn) {
      return;
    }

    if (Number(item['ResetCount']) < RECYCLE_CHARACTER_RESET_COUNT) {
      alert(`回收角色转生次数低于 ${RECYCLE_CHARACTER_RESET_COUNT} 次`);
      return;
    }

    if (Number(item['cLevel']) < RECYCLE_CHARACTER_LEVEL) {
      alert(`回收角色等级低于 ${RECYCLE_CHARACTER_LEVEL} 级`);
      return;
    }

    setLoading(true);

    http
      .post(`/api/users/recycleCharacter`, {
        username: item['AccountID'],
        characterName: item['Name'],
      })
      .then(() => {
        alert('成功回收该角色, 请查看你的元宝，元宝可以用来购买进阶宝石');
        // setTimeout(() => {
        //   location.reload();
        // }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        updateMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getPrize = () => {
    const emptySlot = 'ffffffffffffffffffffffffffffffff';
    const myPrize = randomPick(PRIZE1);
    let inventoryIsEmpty = true;

    for (let i = 12; i < 12 + 64; i++) {
      if (getInventoryItemByIndex(item.Inventory, i) !== emptySlot) {
        inventoryIsEmpty = false;
        break;
      }
    }

    if (!inventoryIsEmpty) {
      alert(
        `当前背包不为空, 兑换装备的时候请保持你的背包是空的, 不然会覆盖原有的物品`
      );
      location.reload();
      return;
    }

    let inventory = item.Inventory;
    inventory = replaceAt(inventory, 32 * 12, myPrize.hex);

    if (loading) {
      return;
    }

    setLoading(true);
    http
      .post(`/api/users/getMyPrize1`, {
        username: item['AccountID'],
        charName: item['Name'],
        inventory,
        msg: myPrize.name,
      })
      .then((r) => {
        console.log(r.data);
        alert(`奖励兑换成功 (${myPrize.name}), 请进入游戏查看`);
        // setTimeout(() => {
        //   location.reload();
        // }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        updateMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const is3Zhuan = [3, 19, 35, 83, 50, 66].includes(item['Class']);
  const abbr = getCharacterAbbr(item['Class']);

  return (
    <Card
      style={{ width: '100%', border: 'none', borderRadius: 0 }}
      key={item['Name']}
      className={`rank-card ${abbr} shadow-sm`}
    >
      <Card.Header className="bg-light">
        <div className="c-header">
          <CharacterAvatar roleName={roleName} />
          <div className="name-role">
            <h5>{item['Name']}</h5>
            <div>{roleName}</div>
          </div>
        </div>
      </Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroupItem>转生次数: {item['ResetCount']}</ListGroupItem>
        <ListGroupItem>当前等级: {item['cLevel']}</ListGroupItem>
        <ListGroupItem>剩余点数: {LevelUpPoint}</ListGroupItem>
        <ListGroupItem>
          <div className="add-points-row">
            <span>力量</span>
            <Form.Control
              type="text"
              placeholder="力量"
              value={Strength}
              onChange={(e) => {
                const v = Number(e.target.value);
                setStrength(v);
                setLevelUpPoint(() => {
                  return totalPoints - v - Dexterity - Vitality - Energy;
                });
              }}
            />
          </div>
          <div className="add-points-row">
            <span>敏捷</span>
            <Form.Control
              type="text"
              placeholder="敏捷"
              value={Dexterity}
              onChange={(e) => {
                const v = Number(e.target.value);
                setDexterit(v);
                setLevelUpPoint(() => {
                  return totalPoints - Strength - v - Vitality - Energy;
                });
              }}
            />
          </div>
          <div className="add-points-row">
            <span>体力</span>
            <Form.Control
              type="text"
              placeholder="体力"
              value={Vitality}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVitality(v);
                setLevelUpPoint(() => {
                  return totalPoints - Strength - Dexterity - v - Energy;
                });
              }}
            />
          </div>
          <div className="add-points-row">
            <span>智力</span>
            <Form.Control
              type="text"
              placeholder="智力"
              value={Energy}
              onChange={(e) => {
                const v = Number(e.target.value);
                setEnergy(v);
                setLevelUpPoint(() => {
                  return totalPoints - Strength - Dexterity - Vitality - v;
                });
              }}
            />
          </div>
        </ListGroupItem>
      </ListGroup>
      <Card.Body style={{ padding: '0.5rem 1rem' }}>
        {EXT1_ENABLE && <Ext1Custom character={item} />}
        {CUSTOM_TITLE_ENABLE && <CustomTitle character={item} />}
        <div className="characters-actions">
          {CAN_RESET_LIFE && (
            <Button
              disabled={loading}
              variant="outline-primary"
              size="sm"
              onClick={resetLifeFn}
            >
              {loading ? 'Loading...' : '转生'}
            </Button>
          )}
          <Button
            disabled={true}
            variant="outline-primary"
            size="sm"
            onClick={clearPoints}
          >
            {loading ? 'Loading...' : '在线洗点'}
          </Button>
          <Button
            disabled={ENABLE_ADD_POINTS}
            variant="outline-primary"
            size="sm"
            onClick={addPoints}
          >
            {loading ? 'Loading...' : '在线加点'}
          </Button>
          {is3Zhuan ? (
            <Button
              disabled={true}
              variant="outline-primary"
              onClick={backTo2Zhuan}
              size="sm"
            >
              {loading ? 'Loading...' : '退回二转'}
            </Button>
          ) : (
            <Button
              disabled={true}
              variant="outline-primary"
              onClick={to3Zhuan}
              size="sm"
            >
              {loading ? 'Loading...' : '三次转职'}
            </Button>
          )}
          <Button
            disabled={false}
            variant="outline-primary"
            onClick={() => {
              setShowChangeNameModal(true);
            }}
            size="sm"
          >
            {loading ? 'Loading...' : '在线改名'}
          </Button>
          <Button
            disabled={loading}
            variant="outline-primary"
            onClick={meHelp}
            size="sm"
          >
            {loading ? 'Loading...' : '自救'}
          </Button>

          {defaultServer.key === '2' && (
            <OverlayTrigger
              key={1}
              placement="top"
              overlay={
                <Popover id="popover-basic">
                  <Popover.Body>
                    需要<strong> {RECYCLE_CHARACTER_RESET_COUNT} </strong>
                    次转生，角色等级
                    <strong> {RECYCLE_CHARACTER_LEVEL} </strong>级, 回收将会获得{' '}
                    <strong>{RECYCLE_CHARACTER_YB}</strong>{' '}
                    元宝，元宝可以购买进阶宝石
                  </Popover.Body>
                </Popover>
              }
            >
              <Button
                variant="outline-primary"
                onClick={recycleCharacter}
                size="sm"
              >
                {loading ? 'Loading...' : '回收角色'}
              </Button>
            </OverlayTrigger>
          )}

          <Button
            disabled={loading}
            variant="outline-primary"
            onClick={deleteCharacter}
            size="sm"
          >
            {loading ? 'Loading...' : '删除角色'}
          </Button>

          {item.prize1 !== 1 && item.ResetCount >= PRIZE_1_NEED_RESET_COUNT && (
            <Button
              disabled={loading}
              variant="outline-primary"
              onClick={getPrize}
              size="sm"
            >
              {loading ? 'Loading...' : '领取奖品'}
            </Button>
          )}
        </div>
      </Card.Body>

      {showChangeNameModal && (
        <CharacterRename
          item={item}
          showChangeNameModal={showChangeNameModal}
          setShowChangeNameModal={setShowChangeNameModal}
        />
      )}
    </Card>
  );
}
