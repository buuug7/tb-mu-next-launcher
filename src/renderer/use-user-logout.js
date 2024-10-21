import { mySessionKey } from 'config';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './user-provider';

export default function useUserLogout() {
  const { notifyUserDataChange } = useContext(UserContext);
  const navigate = useNavigate();

  return () => {
    window.localStorage.removeItem(mySessionKey);
    notifyUserDataChange({ clean: true });
    navigate('/');
  };
}
