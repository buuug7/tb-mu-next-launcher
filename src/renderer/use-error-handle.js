import { useContext } from 'react';
import { UserContext } from './user-provider';

export default function useErrorHandler() {
  const { updateMessage } = useContext(UserContext);

  return (err) => {
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
  };
}
