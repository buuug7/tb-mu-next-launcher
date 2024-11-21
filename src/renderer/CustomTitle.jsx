/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useContext, useEffect, useState } from 'react';
import { Alert, Form, Modal, Button } from 'react-bootstrap';
import { customTitle, getSomeJson } from './api';
import { checkName, checkNameLength, groupBy } from '../util';
import { UserContext } from './UserProvider';
import { MuConfigContext } from './MuConfigProvider';
import { getBaseUrl } from '../config';
import useErrorHandler from './use-error-handle';
import MySwal from './MySwal';

export default function CustomTitle({ character }) {
  const { muConfig } = useContext(MuConfigContext);
  const { user, notifyUserDataChange } = useContext(UserContext);
  const [customTitleName, setCustomTitleName] = useState(
    character.customTitleName || ''
  );
  const [customTitleIndex, setCustomTitleIndex] = useState(
    character.customTitleIndex || 0
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorhandler = useErrorHandler();

  const [titles, setTitles] = useState([]);

  useEffect(() => {
    getSomeJson('custom-title').then(({ data }) => {
      setTitles(data);
    });
  }, []);

  const gTitles = groupBy(titles, (it) => it.category);

  return (
    <div>
      <Alert variant="primary" style={{ padding: '0.5rem' }}>
        <div>
          <div>
            <span>自定义称号</span>
          </div>
          <div className="pb-1 fst-italic ">
            {character.customTitleName ? (
              <b>{character.customTitleName}</b>
            ) : (
              <b className="text-secondary">暂无称号</b>
            )}
          </div>
          <div onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
            <img
              placeholder="blur"
              src={
                getBaseUrl() +
                (titles.find(
                  (it) => it.titleIndex === character.customTitleIndex
                )?.url || '/custom-title/placeholder.png')
              }
              width={80}
              height={80}
              alt={character.customTitleIndex}
            />
          </div>
        </div>

        <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>自定义头像称号</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="称号"
              value={customTitleName}
              onChange={(e) => setCustomTitleName(e.target.value)}
            />

            <div>
              {Object.keys(gTitles).map((k) => (
                <div key={k} className="d-flex flex-row py-4 flex-wrap">
                  {gTitles[k].map((item) => (
                    <div
                      key={item.titleIndex}
                      className="p-2"
                      style={{
                        border:
                          item.titleIndex === customTitleIndex
                            ? '1px solid #0d6efd'
                            : 'none',
                        transform:
                          item.titleIndex === customTitleIndex
                            ? 'scale(1.25)'
                            : 'none',
                      }}
                    >
                      <img
                        placeholder="blur"
                        src={getBaseUrl() + item.url}
                        width={85}
                        height={85}
                        alt={item.titleIndex}
                        onClick={() => {
                          setCustomTitleIndex(item.titleIndex);
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-primary"
              onClick={() => setShowModal(false)}
            >
              关闭
            </Button>
            <Button
              variant="primary"
              disabled={loading}
              onClick={async () => {
                if (!customTitleName) {
                  MySwal.alert('请填写称号', 'error');
                  return;
                }

                if (!customTitleIndex) {
                  MySwal.alert('请选择头像', 'error');
                  return;
                }

                if (!checkName(customTitleName)) {
                  MySwal.alert(
                    '输入的数据包含系统所禁止的字符,请重新输入',
                    'error'
                  );
                  return;
                }

                if (!checkNameLength(customTitleName, 16)) {
                  MySwal.alert('称号太长', 'error');
                  return;
                }

                if (user['WCoinP'] - muConfig.customTitleNeedWcoin < 0) {
                  MySwal.alert(
                    `自定义称号需要 ${muConfig.customTitleNeedWcoin} 积分,你当前的积分还不够.`,
                    'error'
                  );
                  return;
                }

                const result = await MySwal.confirm(
                  `自定义称号需要收取额外的 ${muConfig.customTitleNeedWcoin} 积分, 你同意吗?`
                );

                if (!result.isConfirmed) {
                  return;
                }

                try {
                  setLoading(true);
                  await customTitle({
                    username: character['AccountID'],
                    characterName: character['Name'],
                    customTitleName,
                    customTitleIndex,
                  });

                  MySwal.alert('成功修改称号');
                  setShowModal(false);
                  notifyUserDataChange();
                } catch (error) {
                  errorhandler(error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? 'Loading...' : '保存'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Alert>
    </div>
  );
}
