/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import {
  EVENT_KILL_MAIN,
  EVENT_SELECT_FOLDER,
  EVENT_SET_REGEDIT,
  showIpAndPortOption,
} from '../config';
import Layout from './Layout';
import meta from '../../release/app/package.json';
import MySwal from './MySwal';
import { MuConfigContext } from './MuConfigProvider';

import useUserSetting, { updateUserSetting } from './use-user-setting';
import useRegeditSetting from './use-regedit-setting';

import './PageSetting.scss';
import useServer from './use-server';

const { electron } = window;

export default function PageSetting() {
  const { muConfig } = useContext(MuConfigContext);

  const [ID, setID] = useState('');
  const [Resolution, setResolution] = useState(1);
  const [MusicOnOff, setMusicOnOff] = useState(1);
  const [SoundOnOff, setSoundOnOff] = useState(1);
  const [WindowMode, setWindowMode] = useState(1);
  const [ColorDepth, setColorDepth] = useState(1);

  const [muFolder, setMuFolder] = useState('');
  const [ipAndPort, setIpAndPort] = useState('');

  const userSetting = useUserSetting();
  const regeditSetting = useRegeditSetting();
  const { servers, currentServer, changeServer } = useServer();

  const onResolutionChange = (e) => {
    setResolution(Number(e.target.value));
  };

  const onColorDepthChange = (e) => {
    setColorDepth(Number(e.target.value));
  };

  useEffect(() => {
    if (regeditSetting.ID) {
      setID(regeditSetting.ID);
    }

    if (regeditSetting) {
      setResolution(regeditSetting.Resolution);
      setMusicOnOff(regeditSetting.MusicOnOff);
      setSoundOnOff(regeditSetting.SoundOnOff);
      setWindowMode(regeditSetting.WindowMode);
      setColorDepth(regeditSetting.ColorDepth);
    }

    if (userSetting.muFolder) {
      setMuFolder(userSetting.muFolder);
    }

    if (userSetting.ipAndPort) {
      setIpAndPort(userSetting.ipAndPort);
    }
  }, [userSetting, regeditSetting]);

  console.log(`Resolution`, Resolution);

  return (
    <Layout>
      <div className="PageSetting container">
        <h4 className="text-left">应用设置</h4>
        <p>
          <span className="text-secondary">登录器版本 v{meta.version}</span>
        </p>
        <hr className="border1" />

        <div className="">
          <Form.Group>
            <Form.Label>服务器选择</Form.Label>
            <Form.Select
              value={currentServer.key}
              onChange={(e) => {
                changeServer(e.target.value);
              }}
            >
              {(servers || []).map((it) => (
                <option value={it.key} key={it.key}>
                  {it.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <hr className="border1" />
          <h5>进程</h5>
          <div>
            <a
              role="button"
              href="#"
              onClick={() => {
                MySwal.confirm('确定要杀死所有 MAIN 进程吗？').then(
                  (result) => {
                    if (!result.isConfirmed) {
                      return;
                    }
                    console.log(`begin kill all main.exe process`);
                    electron.ipcRenderer.sendMessage(EVENT_KILL_MAIN, []);
                  }
                );
              }}
            >
              杀死所有 MAIN.EXE 进程
            </a>
          </div>
          <hr className="border1" />

          <Form.Group>
            <Form.Label>账号</Form.Label>
            <Form.Control
              type="text"
              placeholder="游戏账号"
              value={ID}
              onChange={(e) => {
                setID(e.target.value);
              }}
            />
          </Form.Group>

          <hr className="border1" />

          <Form.Group>
            <Form.Label>分辨率</Form.Label>
            <Form.Check
              type="radio"
              label="800x600"
              name="Resolution"
              value={1}
              onChange={onResolutionChange}
              checked={Resolution === 1}
            />
            <Form.Check
              type="radio"
              label="1024x768"
              name="Resolution"
              value={2}
              onChange={onResolutionChange}
              checked={Resolution === 2}
            />
            <Form.Check
              type="radio"
              label="1366x768"
              name="Resolution"
              value={3}
              onChange={onResolutionChange}
              checked={Resolution === 3}
            />
          </Form.Group>

          <hr className="border1" />

          <Form.Group>
            <Form.Label>图像质量</Form.Label>
            <Form.Check
              type="radio"
              label="16bit"
              name="ColorDepth"
              value={0}
              onChange={onColorDepthChange}
              checked={ColorDepth === 0}
            />
            <Form.Check
              type="radio"
              label="32bit"
              name="ColorDepth"
              value={1}
              onChange={onColorDepthChange}
              checked={ColorDepth === 1}
            />
          </Form.Group>

          <hr className="border1" />

          <Form.Group>
            <Form.Label>其他</Form.Label>
            <Form.Check
              type="checkbox"
              label="窗口模式"
              checked={WindowMode === 1}
              onChange={(e) => {
                setWindowMode(e.target.checked ? 1 : 0);
              }}
            />
            <Form.Check
              type="checkbox"
              label="音效"
              checked={MusicOnOff === 1}
              onChange={(e) => {
                setMusicOnOff(e.target.checked ? 1 : 0);
              }}
            />
            <Form.Check
              type="checkbox"
              label="声音"
              checked={SoundOnOff === 1}
              onChange={(e) => {
                setSoundOnOff(e.target.checked ? 1 : 0);
              }}
            />
          </Form.Group>

          <hr className="border1" />

          <h5>客户端路径</h5>
          <div>
            <div
              tabIndex={0}
              role="button"
              className="mt-2 py-2 bg-light d-flex flex-column  text-secondary"
              onClick={() => {
                electron.ipcRenderer.once(EVENT_SELECT_FOLDER, (data) => {
                  const folder = data.filePaths[0];
                  if (!folder.endsWith('main.exe')) {
                    MySwal.message(`注意: 请选择客户端文件夹中的 main.exe`);
                    return;
                  }
                  setMuFolder(folder);
                });

                electron.ipcRenderer.sendMessage(EVENT_SELECT_FOLDER, []);
              }}
            >
              <div className="mb-2 text-secondary">
                请选择客户端文件夹中的 main.exe
              </div>
              <div className="mb-2 text-break">
                {muFolder || '未设置客户端路径'}
              </div>
            </div>
          </div>

          {showIpAndPortOption && (
            <div>
              <h5>IP和端口</h5>
              <div className="mb-3">
                <label className="form-label">格式 192.168.1.21:44405</label>
                <input
                  type="text"
                  className="form-control"
                  value={ipAndPort}
                  onChange={(e) => {
                    setIpAndPort(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <hr className="border1" />

          <div>
            <button
              type="submit"
              className="btn btn-outline-primary me-2"
              onClick={(e) => {
                e.preventDefault();
                const data = {
                  ID,
                  Resolution,
                  MusicOnOff,
                  SoundOnOff,
                  WindowMode,
                  ColorDepth,
                };

                electron.ipcRenderer.sendMessage(EVENT_SET_REGEDIT, [data]);

                updateUserSetting({
                  ...userSetting,
                  muFolder: muFolder?.toLowerCase().endsWith('.exe')
                    ? muFolder.slice(0, -9)
                    : muFolder,
                  ipAndPort,
                  regedit: data,
                  server: currentServer,
                });

                MySwal.message('保存成功');
              }}
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
