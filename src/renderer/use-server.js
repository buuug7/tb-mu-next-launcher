import { useContext, useEffect, useState } from 'react';
import { MuConfigContext } from './MuConfigProvider';
import { defaultServerKey, USER_SETTING_KEY } from '../config';
import useUserSetting from './use-user-setting';
import useUserLogout from './use-user-logout';
import MySwal from './MySwal';

const { electron } = window;

export default function useServer() {
  const logout = useUserLogout();
  const { muConfig } = useContext(MuConfigContext);
  const userSetting = useUserSetting();

  const servers = muConfig?.servers || [];
  const [currentServer, setCurrentServer] = useState(servers[0]);

  useEffect(() => {
    if (userSetting?.server) {
      setCurrentServer(userSetting.server);
    }
  }, [userSetting]);

  return {
    currentServer,
    servers,
    changeServer: (serverKey) => {
      const selectedServer =
        servers.find((it) => it.key === serverKey) || servers[0];

      window.localStorage.setItem(defaultServerKey, selectedServer.key);

      electron.store.set(USER_SETTING_KEY, {
        ...userSetting,
        server: selectedServer,
        [`version-${selectedServer.key}`]: 0,
      });

      MySwal.message(`服务器已经切换，请重新登录`);

      logout();
    },
  };
}
