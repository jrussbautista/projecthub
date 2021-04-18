import { createContext, useContext, useState } from 'react';

type Type = 'success' | 'error';

interface InitialState {
  visible: boolean;
  message: string;
  type: Type;
}

const initialState: InitialState = {
  visible: false,
  message: '',
  type: 'success',
};

const NotificationContext = createContext({
  ...initialState,
  showNotification: (_type: Type, _message: string) => {},
  closeNotification: () => {},
});

export const NotificationProvider: React.FC = ({ children }) => {
  const [notification, setNotification] = useState(initialState);

  const showNotification = (type: Type, message: string) => {
    setNotification({
      visible: true,
      message,
      type,
    });
  };

  const closeNotification = () => {
    setNotification(initialState);
  };

  return (
    <NotificationContext.Provider
      value={{ ...notification, showNotification, closeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
