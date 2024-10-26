import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MuConfigContext } from './MuConfigProvider';
import Layout from './Layout';
import CheckClient from './CheckClient';
import { EVENT_RUN_MU } from '../config';

import './PageIndex.scss';

const { electron } = window;

export default function PageIndex() {
  const { muConfig } = useContext(MuConfigContext);
  const [loading, setLoading] = useState(false);
  const myRef = useRef(null);

  const boxData = muConfig?.indexPage?.box || [];

  return (
    <Layout>
      <div className="p-4 mb-4 bg-white bg-jump">
        <div className="overlay" />
        <div className="container-fluid">
          <h1 className="display-5 fw-bold">{muConfig.siteSecondaryTitle}</h1>
          <p className="fs-4">{muConfig.siteDescription}</p>
          <hr />
          <CheckClient ref={myRef} />
          <div>
            <Button
              disabled={loading}
              variant="outline-primary"
              onClick={() => {
                setLoading(true);
                myRef.current.checkUpdate().then(() => {
                  electron.ipcRenderer.sendMessage(EVENT_RUN_MU, []);
                  setLoading(false);
                });
              }}
            >
              {loading ? 'Loading...' : '启动游戏'}
            </Button>
            <Button
              disabled={loading}
              variant="link"
              onClick={() => {
                setLoading(true);
                myRef.current.checkUpdate(true).then(() => {
                  setLoading(false);
                });
              }}
            >
              {loading ? 'Loading...' : '更新客户端'}
            </Button>
            <a
              href={muConfig.qqLink}
              className="btn btn-link ms-2"
              target="_blank"
              rel="noreferrer"
            >
              添加QQ群
            </a>
            <Link to="/register" className="btn btn-link ms-2">
              注册登录
            </Link>
            <Link to="/setting" className="btn btn-link ms-2">
              更多设置
            </Link>
          </div>
        </div>
      </div>

      <div className="index-feature mt-4">
        {boxData.map((it) => (
          <div className="box" key={it.title}>
            <div className="overlay" />
            <h5>{it.title}</h5>
            <ul>
              {it.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mb-5 mt-4">
        <h4 className="index-title">特别感谢</h4>
        <div className="">
          {(muConfig.bigThanks || []).map((item) => (
            <div className="item" key={item.id}>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
