import { createContext, useState, useEffect } from 'react';
import { getSomeJson } from './api';
import { getDefaultServer } from '../util';
import useErrorHandler from './use-error-handle';

export const MuConfigContext = createContext({
  muConfig: {},
  setMuConfig: () => {},
  defaultServer: null,
});

export default function MuConfigProvider({ children }) {
  const [muConfig, setMuConfig] = useState({});
  const [defaultServer, setDefaultServer] = useState(null);
  const errorHandler = useErrorHandler();

  useEffect(() => {
    getSomeJson('mu-config')
      .then(({ data }) => {
        setMuConfig(data);
        setDefaultServer(getDefaultServer(data.servers || []));
      })
      .catch(errorHandler);
  }, [errorHandler]);

  return (
    <MuConfigContext.Provider
      value={{
        muConfig,
        setMuConfig,
        defaultServer,
      }}
    >
      {children}
    </MuConfigContext.Provider>
  );
}
