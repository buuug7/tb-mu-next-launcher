/* eslint-disable no-restricted-globals */

import { useContext, useEffect, useState } from 'react';
import {
  Card,
  Form,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Popover,
  Button,
  Alert,
  Badge,
} from 'react-bootstrap';
import {
  classToName,
  getCharacterAbbr,
  getTotalPoints,
  isFirstEvolution,
  isSecondEvolution,
  isThirdEvolution,
  validateSinglePoints,
} from '../util';
import {
  CAN_RESET_LIFE,
  CUSTOM_TITLE_ENABLE,
  EXT1_ENABLE,
  RECYCLE_CHARACTER_YB,
  RECYCLE_CHARACTER_LEVEL,
  RESET_LIFT_MAX_COUNT,
  RESET_LIFT_REQUIRE_LEVEL,
  RECYCLE_CHARACTER_RESET_COUNT,
  ENABLE_ADD_POINTS,
  EnableResetPoints,
  EnableRecycleCharacter,
} from '../config';
import CharacterAvatar from './CharacterAvatar';
import Ext1Custom from './Ext1Custom';
import CustomTitle from './CustomTitle';
import CharacterRename from './CharacterRename';
import {
  addPoints,
  backToSecondEvolution,
  deleteCharacter,
  recycleCharacter,
  resetPoints,
  selfHelp,
  toThirdEvolution,
} from './api';
import MySwal from './MySwal';
import { MessageContext } from './MessageProvider';
import { MuConfigContext } from './MuConfigProvider';

export default function CharacterCard({ item, onRefresh }) {
  const { updateMessage } = useContext(MessageContext);
  const { muConfig } = useContext(MuConfigContext);
  const [loading, setLoading] = useState(false);
  const [Strength, setStrength] = useState(item['Strength']);
  const [Dexterity, setDexterit] = useState(item['Dexterity']);
  const [Vitality, setVitality] = useState(item['Vitality']);
  const [Energy, setEnergy] = useState(item['Energy']);
  const [LevelUpPoint, setLevelUpPoint] = useState(item['LevelUpPoint']);
  const [showChangeNameModal, setShowChangeNameModal] = useState(false);

  const totalPoints = getTotalPoints(item, muConfig?.defaultClassInfo);
  const roleName = classToName[item['Class']];

  useEffect(() => {
    setStrength(item.Strength);
    setDexterit(item.Dexterity);
    setVitality(item.Vitality);
    setEnergy(item.Vitality);
  }, [item]);

  const abbr = getCharacterAbbr(item['Class']);

  return (
    <Card
      style={{ width: '100%', border: 'none', borderRadius: 0 }}
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
      <Card.Body className="">
        <Alert className="mb-0 py-2 px-2">
          <Badge bg="primary" pill>
            转生次数 {item['ResetCount']}
          </Badge>
          <Badge bg="primary" pill>
            普通等级 {item['cLevel']}
          </Badge>
          <Badge bg="primary" pill>
            大师等级 {item['MasterLevel']}
          </Badge>
        </Alert>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem>剩余点数: {LevelUpPoint}</ListGroupItem>
        <ListGroupItem>
          <div className="add-points-row">
            <span>力量</span>
            <Form.Control
              type="text"
              placeholder="力量"
              value={Strength}
              onChange={(e) => {
                const v = validateSinglePoints(Number(e.target.value));
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
                console.log(`e`, e);

                const v = validateSinglePoints(Number(e.target.value));
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
                const v = validateSinglePoints(Number(e.target.value));
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
                const v = validateSinglePoints(Number(e.target.value));
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
              onClick={() => {
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

                MySwal.confirm({
                  text: '你确定要转生吗?',
                }).then((result) => {
                  if (!result.isConfirmed) {
                    return;
                  }

                  setLoading(true);
                  resetLife({
                    charName: item['Name'],
                  })
                    .then(() => {
                      MySwal.message('成功转职');
                      onRefresh();
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                });
              }}
            >
              {loading ? 'Loading...' : '在线转生'}
            </Button>
          )}
          <Button
            disabled={!EnableResetPoints}
            variant="outline-primary"
            size="sm"
            onClick={() => {
              if (loading) {
                return;
              }

              MySwal.confirm({
                text: `你确定要洗点吗？`,
              }).then((result) => {
                if (!result.isConfirmed) {
                  return;
                }

                setLoading(true);
                resetPoints({
                  charName: item['Name'],
                })
                  .then(() => {
                    MySwal.message('洗点成功');
                    onRefresh();
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              });
            }}
          >
            {loading ? 'Loading...' : '在线洗点'}
          </Button>
          <Button
            disabled={!ENABLE_ADD_POINTS}
            variant="outline-primary"
            size="sm"
            onClick={() => {
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

              MySwal.confirm({
                text: '你确定要加点吗？',
              }).then((result) => {
                if (!result.isConfirmed) {
                  return;
                }

                setLoading(true);
                addPoints({
                  charName: item['Name'],
                  Strength: Strength,
                  Dexterity: Dexterity,
                  Vitality: Vitality,
                  Energy: Energy,
                })
                  .then(() => {
                    MySwal.message('加点成功');
                    onRefresh();
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              });
            }}
          >
            {loading ? 'Loading...' : '在线加点'}
          </Button>
          {isThirdEvolution(item['Class']) ? (
            <Button
              disabled={loading}
              variant="outline-primary"
              onClick={() => {
                if (loading) {
                  return;
                }

                if (!isThirdEvolution(item['Class'])) {
                  updateMessage('貌似你还没有三转');
                  return;
                }

                MySwal.confirm({
                  text: '你确定要恢复到二转吗? 恢复二转请取下三代翅膀,不然会丢失',
                }).then((result) => {
                  if (!result.isConfirmed) {
                    return;
                  }

                  setLoading(true);
                  backToSecondEvolution({
                    charName: item['Name'],
                  })
                    .then(() => {
                      MySwal.message('成功恢复到二转');
                      onRefresh();
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                });
              }}
              size="sm"
            >
              {loading ? 'Loading...' : '退回二转'}
            </Button>
          ) : (
            <Button
              disabled={loading || isFirstEvolution(item['Class'])}
              variant="outline-primary"
              onClick={() => {
                if (loading) {
                  return;
                }

                if (!isSecondEvolution(item['Class'])) {
                  updateMessage('只有二次转职职业才能进行三次转职');
                  return;
                }

                MySwal.confirm({
                  text: '确定要三次转职?',
                }).then((result) => {
                  if (!result.isConfirmed) {
                    return;
                  }
                  setLoading(true);
                  toThirdEvolution({
                    charName: item['Name'],
                  })
                    .then(() => {
                      MySwal.message('成功三次转职');
                      onRefresh();
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                });
              }}
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
            onClick={() => {
              if (loading) {
                return;
              }

              MySwal.confirm({
                text: '你确定要进行自救吗？',
              }).then((result) => {
                if (!result.isConfirmed) {
                  return;
                }

                setLoading(true);

                selfHelp({
                  charName: item['Name'],
                })
                  .then(() => {
                    MySwal.message('成功自救');
                    onRefresh();
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              });
            }}
            size="sm"
          >
            {loading ? 'Loading...' : '自救'}
          </Button>
          {EnableRecycleCharacter && (
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
                onClick={() => {
                  if (loading) {
                    return;
                  }

                  if (
                    Number(item['ResetCount']) < RECYCLE_CHARACTER_RESET_COUNT
                  ) {
                    updateMessage(
                      `回收角色转生次数低于 ${RECYCLE_CHARACTER_RESET_COUNT} 次`
                    );
                    return;
                  }

                  if (Number(item['cLevel']) < RECYCLE_CHARACTER_LEVEL) {
                    updateMessage(
                      `回收角色等级低于 ${RECYCLE_CHARACTER_LEVEL} 级`
                    );
                    return;
                  }

                  MySwal.confirm({
                    text: `回收角色需要 ${RECYCLE_CHARACTER_LEVEL} 等级, 回收将获得 ${RECYCLE_CHARACTER_YB} 元宝, 你确定要回收该角色吗？`,
                  }).then((result) => {
                    if (!result.isConfirmed) {
                      return;
                    }

                    setLoading(true);
                    recycleCharacter({
                      charName: item['Name'],
                    })
                      .then(() => {
                        MySwal.message(
                          '成功回收该角色, 请查看你的元宝，元宝可以用来购买进阶宝石'
                        );
                        onRefresh();
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  });
                }}
                size="sm"
              >
                {loading ? 'Loading...' : '回收角色'}
              </Button>
            </OverlayTrigger>
          )}

          <Button
            disabled={loading}
            variant="outline-primary"
            onClick={() => {
              if (loading) {
                return;
              }

              MySwal.confirm({
                text: '删除的角色无法恢复, 你确定要删除该角色吗？',
              }).then((result) => {
                if (!result.isConfirmed) {
                  return;
                }

                setLoading(true);
                deleteCharacter({
                  charName: item.Name,
                })
                  .then(() => {
                    MySwal.message('成功删除角色');
                    onRefresh();
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              });
            }}
            size="sm"
          >
            {loading ? 'Loading...' : '删除角色'}
          </Button>
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
