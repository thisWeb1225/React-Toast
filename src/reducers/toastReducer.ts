export type toastComponentsTypeKey = 'success' | 'warning' | 'info'| 'error';

export type ToastItemType = {
    message: string,
    type: toastComponentsTypeKey,
    id: number
}

export type ToastsStateType = {
  toasts: ToastItemType[]
}

export type ReducerAction = {
  type: string,
  payload?: any,
}

const toastReducer = (state: ToastsStateType, action: ReducerAction) => {
  switch (action.type) {
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    }
    case 'DELETE_TOAST':  {
      const updatedToast = state.toasts.filter((toast) => {
        return toast.id !== action.payload
      })

      return {
        ...state,
        toasts: updatedToast
      }
    }
    default: {
      throw new Error(`Unhandled action type ${action.type}`)
    }
      
  }
}

export default toastReducer;