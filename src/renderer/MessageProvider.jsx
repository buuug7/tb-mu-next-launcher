import { useState, createContext } from 'react';

export const MessageContext = createContext({
  message: '',
  updateMessage: () => {},
});

export default function MessageProvider({ children }) {
  const [message, setMessage] = useState('');
  return (
    <MessageContext.Provider value={{ message, updateMessage: setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
