import { useRef, useEffect, useCallback } from "react";
import { ToastItemType, toastComponentsTypeKey } from "../reducers/toastReducer";

import {
  AlertCircle,
  CircleCheck,
  CircleX,
  InfoCircle,
  X,
} from "tabler-icons-react";
import useToast from "../hooks/useToast";


type ToastComponentsType = {
  [key in toastComponentsTypeKey]: {
    icon: JSX.Element;
    iconClass: string;
    progressBarClass: string;
  };
};

const toastComponentsTypes: ToastComponentsType = {
  success: {
    icon: <CircleCheck />,
    iconClass: "success-icon",
    progressBarClass: "success",
  },
  warning: {
    icon: <AlertCircle />,
    iconClass: "warning-icon",
    progressBarClass: "warning",
  },
  info: {
    icon: <InfoCircle />,
    iconClass: "info-icon",
    progressBarClass: "info",
  },
  error: {
    icon: <CircleX />,
    iconClass: "error-icon",
    progressBarClass: "error",
  },
};

const Toast = ({ message, type, id }: ToastItemType) => {
  const { icon, iconClass, progressBarClass } = toastComponentsTypes[type];
  const toast = useToast();

  const timerID = useRef<number>();

  const dismissToast = useCallback( () => {
    toast.deleteToast(id);
  }, [])

  useEffect(() => {
    timerID.current = setTimeout(() => dismissToast(), 3900)
    return () => clearTimeout(timerID.current)
  }, [dismissToast])

  return (
    <div className="toast">
      <span className={iconClass}>{icon}</span>
      <p className="toast-message">{message}</p>
      <button className="dismiss-btn" onClick={() => dismissToast()}>
        <X size={18} color="#aeb0d7" />
      </button>

      <div className="toast-progress">
        <div className={`toast-progress-bar ${progressBarClass}`}></div>
      </div>
    </div>
  )
}

export default Toast;