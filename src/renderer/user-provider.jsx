import { createContext, useEffect, useState } from 'react';
import { getDefaultServer } from '../util';
import useUserData from './use-user-data';
import { SERVERS } from '../config';

export const UserContext = createContext({
  user: null,
  updateUser: () => {},
  message: '',
  updateMessage: () => {},
  defaultServer: SERVERS[0],
});

export default function UserProvider({ children }) {
  const [message, setMessage] = useState('');
  const [defaultServer, setDefaultServer] = useState(SERVERS[0]);
  const [user, setUser] = useUserData();

  console.log(`user userProvider`, user);

  useEffect(() => {
    setDefaultServer(getDefaultServer());
  }, []);

  const value = {
    user: user,
    updateUser: setUser,
    message: message,
    updateMessage: setMessage,
    defaultServer: defaultServer,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
