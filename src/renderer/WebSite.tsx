/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable promise/catch-or-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { getBaseUrl } from 'config';

const { electron } = window;

export default function WebSite() {
  const history = useNavigate();

  useEffect(() => {
    electron.ipcRenderer.sendMessage('resizeWindow', {
      width: 800,
      height: 600,
    });

    return () => {
      electron.ipcRenderer.sendMessage('resizeWindow', {
        width: 320,
        height: 525,
      });
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          type="submit"
          className="btn btn-link me-2"
          onClick={() => {
            history(-1);
          }}
        >
          返回登录器首页
        </button>
      </div>
      <webview
        src={getBaseUrl()}
        style={{
          width: '780px',
          height: '520px',
        }}
      />
    </div>
  );
}
