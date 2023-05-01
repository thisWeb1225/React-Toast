/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createContext, useReducer } from 'react';
import toastReducer, { ToastsStateType } from '../reducers/toastReducer';
import ToastsContainer from '../components/ToastsContainer';

type ToastContextType = {
  deleteToast: (id: number) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
};


// @ts-ignore
export const ToastContext = createContext<ToastContextType>({});

const initToastState: ToastsStateType = {
  toasts: [],
};

type PropsType = {
  children: JSX.Element;
};

export const ToastContextProvider = ({ children }: PropsType) => {
  const [state, dispatch] = useReducer(toastReducer, initToastState);

  const addToast = (type: string, message: string) => {
    const id = Math.floor(Math.random() * 100000);
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } });
  };

  const deleteToast = (id: number) => {
    dispatch({ type: 'DELETE_TOAST', payload: id });
  };

  const success = (message: string) => {
    addToast('success', message);
  };

  const warning = (message: string) => {
    addToast('warning', message);
  };

  const info = (message: string) => {
    addToast('info', message);
  };

  const error = (message: string) => {
    addToast('error', message);
  };

  const value = { deleteToast, success, warning, info, error };

  return (
    <ToastContext.Provider value={value}>
      <ToastsContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
};
