import { createContext, useState, useEffect } from 'react';
import { getSomeJson } from './api';
import { defaultServerKey } from '../config';
import useErrorHandler from './use-error-handle';

export const MuConfigContext = createContext({
  muConfig: {},
  setMuConfig: () => {},
});

export default function MuConfigProvider({ children }) {
  const [muConfig, setMuConfig] = useState({});
  const errorHandler = useErrorHandler();

  useEffect(() => {
    getSomeJson('mu-config')
      .then(({ data }) => {
        setMuConfig(data);

        // 设置默认server key, 如果 localStorage 不存在
        if (!localStorage.getItem(defaultServerKey)) {
          localStorage.setItem(defaultServerKey, data.servers[0].key);
        }
      })
      .catch(errorHandler);
  }, [errorHandler]);

  return (
    <MuConfigContext.Provider
      value={{
        muConfig,
        setMuConfig,
      }}
    >
      {children}
    </MuConfigContext.Provider>
  );
}
