/* eslint-disable no-restricted-globals */

import { useContext, useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { getExt1ValueByIndex } from '../util';
import { UserContext } from './UserProvider';
import { customExt1Reset, customExt1Update } from './api';
import { MessageContext } from './MessageProvider';

import MySwal from './MySwal';
import useErrorHandler from './use-error-handle';
import { MuConfigContext } from './MuConfigProvider';

export default function Ext1Custom({ character }) {
  const { user, notifyUserDataChange } = useContext(UserContext);
  const { muConfig } = useContext(MuConfigContext);
  const { updateMessage } = useContext(MessageContext);
  const [type, setType] = useState(muConfig?.updateExt1Type?.comboRate);
  const [addProb, setAddProb] = useState(0);
  const [totalProb, setTotalProb] = useState(0);
  const [costJf, setCostJf] = useState(0);
  const [loading, setLoading] = useState(false);

  const errorHandler = useErrorHandler();

  const JF = user['WCoinP'];
  const currentValue = getExt1ValueByIndex(character['Ext1'], type.extIndex);

  useEffect(() => {
    setTotalProb((r1) => {
      if (r1 > type.maxValue) {
        return type.maxValue;
      }
      return currentValue + addProb;
    });

    setCostJf(() => {
      return addProb * type.jfPerValue;
    });
  }, [addProb, currentValue, type]);

  const resetInitial = () => {
    setAddProb(0);
  };

  return (
    <div>
      <Alert style={{ padding: '0.5rem' }}>
        <div className="mb-2 UPDATE_EXT1_TYPE-buttons">
          {Object.keys(muConfig.updateExt1Type).map((key) => (
            <Button
              size="sm"
              className="me-1"
              variant={
                type.extIndex === muConfig.updateExt1Type[key].extIndex
                  ? 'primary'
                  : 'outline-primary'
              }
              key={key}
              onClick={() => {
                setType(muConfig.updateExt1Type[key]);
                setAddProb(0);
              }}
            >
              {muConfig.updateExt1Type[key].nameAbbr}
            </Button>
          ))}
        </div>

        <div className="mb-1">
          当前 <b>{type.name}</b> 为 <i>{currentValue}%</i>,{' '}
          <span>升级后为 </span>{' '}
          <i>
            {totalProb}% = {currentValue}%
          </i>{' '}
          + <span className="text-danger">{addProb}%</span> , 需要积分{' '}
          <i className="text-danger">{costJf}</i>
        </div>

        <div>
          <Button
            size="sm"
            className="me-1"
            variant="outline-primary"
            onClick={() => {
              setAddProb((r1) => {
                if (totalProb >= type.maxValue) {
                  return r1;
                }
                return r1 + 1;
              });
            }}
          >
            +
          </Button>
          <Button
            size="sm"
            className="me-1"
            variant="outline-primary"
            onClick={() => {
              setAddProb((r1) => {
                if (totalProb <= currentValue) {
                  return 0;
                }
                return r1 - 1;
              });
            }}
          >
            -
          </Button>

          <Button
            disabled={loading}
            size="sm"
            className="me-1"
            variant="outline-primary"
            onClick={async () => {
              if (costJf <= 0) {
                return;
              }

              if (JF - costJf < 0) {
                updateMessage(`当前用户积分不够`);
                return;
              }

              const result = await MySwal.confirm(
                `你当前的 ${type.name} 为 ${currentValue}%, 提升之后为 ${totalProb}%, 提升需要积分 ${costJf}, 你同意吗? `
              );

              if (!result.isConfirmed) {
                return;
              }

              try {
                setLoading(true);
                await customExt1Update({
                  charName: character['Name'],
                  addProb: addProb,
                  typeKey: type.key,
                });

                MySwal.alert(`升级成功!`);
                notifyUserDataChange();
                resetInitial();
              } catch (error) {
                errorHandler(error);
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Loading...' : '确认'}
          </Button>

          <Button
            disabled={loading}
            size="sm"
            variant="link"
            onClick={async () => {
              const result = await MySwal.confirm(
                `重置**${type.name}**到初始状态, 花费的积分不会退还, 你同意吗? `
              );

              if (!result.isConfirmed) {
                return;
              }

              try {
                setLoading(true);
                await customExt1Reset({
                  charName: character['Name'],
                  typeKey: type.key,
                });
                notifyUserDataChange();
                resetInitial();
                MySwal.alert(`重置成功!`);
              } catch (error) {
                errorHandler(error);
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Loading...' : '重置'}
          </Button>
        </div>
      </Alert>
    </div>
  );
}
