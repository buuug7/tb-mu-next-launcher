import { mySessionKey } from 'config';
import { useContext } from 'react';
import { UserContext } from './UserProvider';

export default function useUserLogout() {
  const { notifyUserDataChange } = useContext(UserContext);

  return () => {
    window.localStorage.removeItem(mySessionKey);
    notifyUserDataChange({ clean: true });
    window.location.reload();
  };
}
