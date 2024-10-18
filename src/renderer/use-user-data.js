import { useEffect, useState } from 'react';
import { getUserData } from './api';
import useMySession from './use-my-session';

export default function useUserData() {
  const session = useMySession();
  const [user, setUser] = useState(null);
  const sessionId = session?.id;

  console.log('session2', session);

  useEffect(() => {
    if (sessionId) {
      getUserData(sessionId)
        .then((r) => {
          setUser(r.data);
        })
        .catch(() => {});
    }
  }, [sessionId]);

  return [user, setUser];
}
