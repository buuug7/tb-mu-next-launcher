import {
  EVENT_CHECK_CLIENT_UPDATE,
  EVENT_RUN_MU,
  EVENT_UPDATE_FINISHED,
  EVENT_UPDATE_PROGRESS,
  USER_DATA_KEY,
  newsUrl,
  servers,
} from 'config';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../http';
import meta from '../../release/app/package.json';

const { electron } = window;

export default function Home() {
  const defaultMsg = '检测更新...';
  const [news, setNews] = useState([]);
  const [updateInfo, setUpdateInfo] = useState({
    msg: defaultMsg,
    finished: true,
  });
  const [defaultServer, setDefaultServer] = useState(servers[0]);

  const updateClient = () => {
    setUpdateInfo((pre) => ({
      ...pre,
      msg: defaultMsg,
      finished: false,
    }));

    electron.ipcRenderer.on(EVENT_UPDATE_PROGRESS, (payload) => {
      console.log(`payload`, payload);
      setUpdateInfo(payload as any);
    });

    electron.ipcRenderer.once(EVENT_UPDATE_FINISHED, () => {
      console.log(EVENT_UPDATE_FINISHED);
      setUpdateInfo((pre) => ({
        ...pre,
        finished: true,
      }));

      electron.ipcRenderer.sendMessage(EVENT_RUN_MU, []);
    });

    electron.ipcRenderer.sendMessage(EVENT_CHECK_CLIENT_UPDATE, []);
  };

  useEffect(() => {
    axios
      .get(newsUrl)
      .then(({ data }) => {
        setNews(data.data);
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  }, []);

  useEffect(() => {
    const userData = window.electron.store.get(USER_DATA_KEY) || {};
    const server = userData.server || servers[0];

    setDefaultServer(server);
    window.electron.store.set(USER_DATA_KEY, {
      ...userData,
      server,
    });
  }, []);

  return (
    <div className="index-page">
      <div className="header">
        <h2 className="text-center">{meta.productionName}</h2>
      </div>

      <div className="flex-center actions mt-2">
        <Link to="/setting" className="btn btn-outline-primary btn-sm me-1">
          <div className="d-flex align-items-center">
            <span>设置 | {defaultServer.name} </span>
          </div>
        </Link>
        <button
          disabled={!updateInfo.finished}
          type="button"
          className="btn btn-primary btn-sm "
          onClick={updateClient}
        >
          启动游戏
        </button>
      </div>

      {!updateInfo.finished && (
        <div className="my-2 p-2 text-center text-break">{updateInfo.msg}</div>
      )}

      {updateInfo.finished && (
        <div className="features">
          <ul>
            {news.map((item: any) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="footer text-muted text-center">
        <Link to="/webpage" className="mx-2">
          土鳖奇迹文档
        </Link>
        <span>v{meta.version}</span>
      </div>
    </div>
  );
}
