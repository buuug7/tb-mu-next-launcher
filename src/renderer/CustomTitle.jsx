/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useContext, useEffect, useState } from 'react';
import { Alert, Form, Modal, Button } from 'react-bootstrap';
import { customTitle, getSomeJson } from './api';
import { CUSTOM_TITLE_JF } from '../config';
import { checkName, checkNameLength, groupBy } from '../util';
import { UserContext } from './UserProvider';
import { MessageContext } from './MessageProvider';
import MySwal from './MySwal';

export default function CustomTitle({ character }) {
  const { user, notifyUserDataChange } = useContext(UserContext);
  const { updateMessage } = useContext(MessageContext);
  const [customTitleName, setCustomTitleName] = useState(
    character.customTitleName || ''
  );
  const [customTitleIndex, setCustomTitleIndex] = useState(
    character.customTitleIndex || 0
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [titles, setTitles] = useState([]);
  const JF = user['WCoinP'];

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
                'my-res://asserts' +
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
                        src={`my-res://assets/` + item.url}
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
              onClick={() => {
                if (!customTitleName) {
                  updateMessage('请填写称号');
                  return;
                }

                if (!customTitleIndex) {
                  updateMessage('请选择头像');
                  return;
                }

                if (!checkName(customTitleName)) {
                  updateMessage('输入的数据包含系统所禁止的字符,请重新输入');
                  return;
                }

                if (!checkNameLength(customTitleName, 16)) {
                  updateMessage('称号太长');
                  return;
                }

                const currentJF = JF;

                if (currentJF - CUSTOM_TITLE_JF < 0) {
                  updateMessage(
                    `自定义称号需要 ${CUSTOM_TITLE_JF} 积分,你当前的积分还不够.`
                  );
                  return;
                }

                MySwal.confirm({
                  text: `自定义称号需要收取额外的 ${CUSTOM_TITLE_JF} 积分, 你同意吗?`,
                }).then((result) => {
                  if (!result.isConfirmed) {
                    return;
                  }

                  setLoading(true);

                  customTitle({
                    username: character['AccountID'],
                    characterName: character['Name'],
                    customTitleName,
                    customTitleIndex,
                  })
                    .then(({ data }) => {
                      console.log(data);
                      updateMessage('成功修改称号');
                      setShowModal(false);
                      notifyUserDataChange();
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                });
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
