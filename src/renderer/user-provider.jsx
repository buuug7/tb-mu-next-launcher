import { createContext, useEffect, useState } from 'react';
import { getDefaultServer } from '../util';
import useUserData from './use-user-data';
import { mySessionKey, SERVERS } from '../config';
import { getMyData } from './api';
import { HTTP_401_EVENT } from './MyCustomEvent';

export const UserContext = createContext({
  user: null,
  notifyUserDataChange: () => {},
  message: '',
  updateMessage: () => {},
  defaultServer: SERVERS[0],
});

export default function UserProvider({ children }) {
  const [message, setMessage] = useState('');
  const [defaultServer, setDefaultServer] = useState(SERVERS[0]);
  const [user, setUser] = useUserData();

  useEffect(() => {
    setDefaultServer(getDefaultServer());
  }, []);

  useEffect(() => {
    window.addEventListener(HTTP_401_EVENT, (event) => {
      console.log(HTTP_401_EVENT, event);
      window.localStorage.removeItem(mySessionKey);
      setUser(null);
      window.location.reload();
    });
  });

  const handleUserDataChange = (event) => {
    if (event && event.clean) {
      setUser(null);
      return;
    }

    getMyData().then(({ data }) => {
      setUser(data);
    });
  };

  const value = {
    user: user,
    notifyUserDataChange: handleUserDataChange,
    message: message,
    updateMessage: setMessage,
    defaultServer: defaultServer,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
