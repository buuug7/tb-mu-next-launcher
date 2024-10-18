import { useEffect, useState } from 'react';
import { mySessionKey } from '../config';

export function setLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
  const event = new CustomEvent('localStorageChange', {
    detail: { key, value },
  });
  window.dispatchEvent(event);
}

export default function useMySession() {
  const initValue = JSON.parse(window.localStorage.getItem(mySessionKey));
  const [session, setSession] = useState(initValue);

  useEffect(() => {
    window.addEventListener('localStorageChange', (event) => {
      console.log('localStorageChange', event);
      if (event.detail.key === mySessionKey) {
        const data = window.localStorage.getItem(mySessionKey);
        const json = JSON.parse(data);
        setSession(json);
      }
    });
  }, []);
  return session;
}
