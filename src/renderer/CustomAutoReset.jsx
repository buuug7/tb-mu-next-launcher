import { useContext } from 'react';
import { Alert, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { MuConfigContext } from './MuConfigProvider';
import { UserContext } from './UserProvider';
import useErrorHandler from './use-error-handle';
import { autoResetConfig, customExt1Reset } from './api';
import { getExt1ValueByIndex } from '../util';
import MySwal from './MySwal';
import IconInfo from './icons/IconInfo';

import './CustomAutoReset.scss';

function AutoResetOverlay() {
  return (
    <OverlayTrigger
      overlay={
        <Popover id="AutoResetOverlay">
          <Popover.Body>
            <p className="mb-1">
              开启后就可以在游戏中使用 <b>/zs auto 力量 敏捷 体力 智力</b>{' '}
              命令进行自动转生并自动加点
            </p>
            <p className="mb-1">
              命令中对应的力量, 敏捷, 体力, 智力可以替换为你想要加点的最大数值,
              可以多设置点, 升级产生的点数会自动加点
            </p>
            <p className="mb-1">
              比如我想开启自动转生并自动加点 2000 力量, 1000 敏捷, 500 体力, 250
              智力, 可以这样输入命令 `/zs auto 2000 1000 500 250`
            </p>
            <p className="mb-1">
              如何关闭自动转生命令? 把命令在聊天框在输入一次就可以关闭自动转生,
              游戏中会有提示信息
            </p>
          </Popover.Body>
        </Popover>
      }
    >
      <span style={{ cursor: 'pointer', color: 'var(--bs-primary)' }}>
        自动转生命令 <IconInfo />
      </span>
    </OverlayTrigger>
  );
}

export default function CustomAutoReset({ character }) {
  const { muConfig } = useContext(MuConfigContext);
  const { notifyUserDataChange } = useContext(UserContext);
  const errorHandler = useErrorHandler();
  const extIndex = muConfig?.autoResetConfig?.extIndex;

  if (!extIndex) {
    return <p>错误，请稍后再试！</p>;
  }

  const value = getExt1ValueByIndex(character['Ext1'], extIndex);
  const price = muConfig.autoResetConfig?.price;

  return (
    <div className="CustomAutoReset">
      <Alert style={{ minHeight: '110px', padding: '0.5rem' }}>
        {value <= 0 ? (
          <p style={{ marginBottom: '0.5rem' }}>
            你还未开启 <AutoResetOverlay />
          </p>
        ) : (
          <p style={{ marginBottom: '0.5rem', color: 'var(--bs-primary)' }}>
            恭喜，你已经开启了 <AutoResetOverlay />
          </p>
        )}
        <div>
          {value <= 0 ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={async () => {
                const result = await MySwal.confirm(
                  `开启自动转生命令需要 ${price} 元宝，在游戏中就可以使用 /zs auto 命令了, 你同意吗? `
                );

                if (!result.isConfirmed) {
                  return;
                }

                try {
                  await autoResetConfig({
                    charName: character['Name'],
                  });
                  notifyUserDataChange();
                  MySwal.alert(`开启成功!`);
                } catch (error) {
                  errorHandler(error);
                }
              }}
            >
              开启
            </Button>
          ) : (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={async () => {
                const result = await MySwal.confirm(
                  `关闭**自动转生**功能, 花费的元宝不会退还, 你同意吗? `
                );

                if (!result.isConfirmed) {
                  return;
                }

                try {
                  await customExt1Reset({
                    charName: character['Name'],
                    typeKey: muConfig.autoResetConfig?.key,
                  });
                  notifyUserDataChange();
                  MySwal.alert(`关闭成功!`);
                } catch (error) {
                  errorHandler(error);
                }
              }}
            >
              关闭
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
}
