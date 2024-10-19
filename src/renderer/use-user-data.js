import { useEffect, useState } from 'react';
import { getMyData } from './api';
import useMySession from './use-my-session';

export default function useUserData() {
  const session = useMySession();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (session) {
      getMyData(session)
        .then((r) => {
          setUser(r.data);
        })
        .catch(() => {});
    }
  }, [session]);

  return [user, setUser];
}
