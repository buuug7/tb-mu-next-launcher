import { useEffect, useState } from 'react';
import { mySessionKey } from '../config';
import { LOCAL_STORAGE_CHANGE } from './MyCustomEvent';

export default function useMySession() {
  const initValue = window.localStorage.getItem(mySessionKey);
  const [session, setSession] = useState(initValue);

  useEffect(() => {
    window.addEventListener(LOCAL_STORAGE_CHANGE, (event) => {
      console.log(LOCAL_STORAGE_CHANGE, event);
      if (event.detail.key === mySessionKey) {
        const data = window.localStorage.getItem(mySessionKey);
        setSession(data);
      }
    });
  }, []);
  return session;
}
