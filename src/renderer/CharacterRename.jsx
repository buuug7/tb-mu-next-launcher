/* eslint-disable no-restricted-globals */

import { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { checkName, checkNameLength } from '../util';
import { UserContext } from './UserProvider';
import { changeCharacterName } from './api';

import MySwal from './MySwal';
import { MuConfigContext } from './MuConfigProvider';
import useErrorHandler from './use-error-handle';

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
  const { muConfig } = useContext(MuConfigContext);
  const [changedName, setChangedName] = useState(item['Name']);
  const [loading, setLoading] = useState(false);
  const { user, notifyUserDataChange } = useContext(UserContext);
  const errorHandler = useErrorHandler();

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
            onClick={async () => {
              if (!checkName(changedName)) {
                MySwal.alert(
                  '输入的数据包含系统所禁止的字符,请重新输入',
                  'error'
                );
                return;
              }

              if (!checkNameLength(changedName)) {
                MySwal.alert('角色名称太长', 'error');
                return;
              }

              if (user['WCoinP'] < muConfig.changeNameNeedWcoin) {
                MySwal.alert(
                  `在线改名需要 ${muConfig.changeNameNeedWcoin} 积分,你当前的积分还不够.`,
                  'error'
                );
                return;
              }

              const result = await MySwal.confirm(
                `在线改名要收取额外的 ${muConfig.changeNameNeedWcoin} 积分, 你同意吗?`
              );

              if (!result.isConfirmed) {
                return;
              }

              try {
                setLoading(true);
                await changeCharacterName({
                  username: item['AccountID'],
                  oldName: item['Name'],
                  newName: changedName,
                });

                setShowChangeNameModal(false);
                MySwal.alert('成功修改角色名称');
                notifyUserDataChange();
              } catch (error) {
                errorHandler(error);
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Loading...' : '保存'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
