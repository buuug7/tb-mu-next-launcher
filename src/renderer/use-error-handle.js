import { useCallback, useContext, useMemo } from 'react';
import MySwal from './MySwal';
import { MessageContext } from './MessageProvider';

export default function useErrorHandler() {
  const { updateMessage } = useContext(MessageContext);

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

    updateMessage(errMsg);
  }

  return useCallback(callback, [updateMessage]);
}
