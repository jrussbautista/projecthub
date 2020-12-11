import React, { createContext, useState, useContext } from "react";

interface State {
  type: string;
  isVisible: boolean;
  openModal(type: string): void;
  closeModal(): void;
}

const defaultValue = {
  type: "",
  isVisible: false,
};

const ModalContext = createContext<State | any>(defaultValue);

export const ModalProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(defaultValue);

  const openModal = (type: string) => {
    setState({ ...state, isVisible: true, type });
  };

  const closeModal = () => {
    setState({ ...state, isVisible: false, type: "" });
  };

  return (
    <ModalContext.Provider value={{ ...state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
