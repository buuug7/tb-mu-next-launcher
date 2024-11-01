import { useCallback } from 'react';
import MySwal from './MySwal';

export default function useErrorHandler() {
  function callback(err) {
    console.log(`err`, err);

    let errMsg = '';
    switch (err.code) {
      case 'ERR_NETWORK':
        errMsg = err.message;
        break;
      default:
        errMsg = err?.response?.data?.message;
        break;
    }
    MySwal.alert(errMsg, 'error');
  }

  return useCallback(callback, []);
}
