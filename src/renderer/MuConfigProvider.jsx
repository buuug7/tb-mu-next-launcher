import { createContext, useState, useEffect } from 'react';
import { getSomeJson } from './api';

export const MuConfigContext = createContext({
  muConfig: {},
  setMuConfig: () => {},
});

export default function MuConfigProvider({ children }) {
  const [muConfig, setMuConfig] = useState({});

  useEffect(() => {
    getSomeJson('mu-config').then(({ data }) => {
      setMuConfig(data);
    });
  }, []);

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
