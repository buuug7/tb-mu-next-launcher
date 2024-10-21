/* eslint-disable no-restricted-globals */

import { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { checkName, checkNameLength } from '../util';
import { CHANGE_NAME_NEED_JF } from '../config';
import { UserContext } from './user-provider';
import { changeCharacterName } from './api';

/**
 *
 * @param {{UserCharacter}} item
 * @returns
 */
export default function CharacterRename({
  item,
  showChangeNameModal,
  setShowChangeNameModal,
}) {
  const [changedName, setChangedName] = useState(item['Name']);
  const [loading, setLoading] = useState(false);
  const { updateMessage, user, notifyUserDataChange } = useContext(UserContext);
  const JF = user['WCoinP'];

  return (
    <div>
      <Modal
        show={showChangeNameModal}
        onHide={() => {
          setShowChangeNameModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>在线改名</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="角色名称"
            value={changedName}
            onChange={(e) => {
              const v = e.target.value;
              setChangedName(v);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={loading}
            variant="outline-primary"
            onClick={() => {
              setShowChangeNameModal(false);
            }}
          >
            关闭
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (!checkName(changedName)) {
                updateMessage('输入的数据包含系统所禁止的字符,请重新输入');
                return;
              }

              if (!checkNameLength(changedName)) {
                updateMessage('角色名称太长');
                return;
              }

              const confirmFn = confirm(
                `在线改名要收取额外的 ${CHANGE_NAME_NEED_JF} 积分, 你同意吗?`
              );

              if (!confirmFn) {
                return;
              }

              if (JF < CHANGE_NAME_NEED_JF) {
                updateMessage(
                  `在线改名需要 ${CHANGE_NAME_NEED_JF} 积分,你当前的积分还不够.`
                );
                return;
              }

              setLoading(true);

              changeCharacterName({
                username: item['AccountID'],
                oldName: item['Name'],
                newName: changedName,
              })
                .then(({ data }) => {
                  console.log(data);
                  setShowChangeNameModal(false);
                  updateMessage('成功修改角色名称');
                  notifyUserDataChange();
                })
                .catch((err) => {
                  console.log(err.response.data);
                  updateMessage(err.response.data.message);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            {loading ? 'Loading...' : '保存'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}