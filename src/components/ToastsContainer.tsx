import Toast from './Toast';
import { ToastItemType } from "../reducers/toastReducer";

type PropsType = {
  toasts: ToastItemType[]
}

const ToastsContainer = ({ toasts }: PropsType) => {
  return (
    <div className="toasts-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastsContainer;