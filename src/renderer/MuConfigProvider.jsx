import { createContext, useState, useEffect } from 'react';
import { getSomeJson } from './api';
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
