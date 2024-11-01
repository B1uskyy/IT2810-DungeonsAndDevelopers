import { CheckCircle } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import { FaUndoAlt } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { IoAlertCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { ToastContext, ToastProps } from '../../context/ToastContext';
import 'react-toastify/dist/ReactToastify.css';
import './CustomToast.css';

const CustomToast = ({ message, type, undoAction, closeToast }: ToastProps) => {
  const [undoVisible, setUndoVisible] = useState(true);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <IoCloseCircleOutline className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <IoAlertCircleOutline className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <IoIosInformationCircleOutline className="w-5 h-5 text-blue-400" />;
    }
  };

  const handleUndoClick = () => {
    setUndoVisible(false); // Trigger the height reduction
    if (undoAction) undoAction();
    closeToast?.();
  };

  return (
    <div className="flex items-center gap-3">
      {getIcon()} <p className="flex-1 text-white">{message}</p>
      {undoAction && (
        <button
          onClick={handleUndoClick}
          className={`undo-button  ${undoVisible ? 'visible' : 'hidden'} px-3 py-1 rounded-md bg-customRed hover:bg-transparent border-2 border-customRed hover:border-customRed hover:text-customRed transition-colors duration-100`}
          style={{ fontFamily: 'MedievalSharp, sans-serif' }}
        >
          <span className="flex items-center gap-2">
            <FaUndoAlt className="w-4 h-4" />
            Undo
          </span>
        </button>
      )}
    </div>
  );
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastId = useRef<string | null>(null);

  const showToast = (props: ToastProps) => {
    if (toastId.current && toast.isActive(toastId.current)) {
      toast.dismiss(toastId.current);
    }

    toastId.current = toast(({ closeToast }) => <CustomToast {...props} closeToast={closeToast} />, {
      position: 'bottom-right',
      autoClose: props.duration,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }) as string;
  };

  return (
    <ToastContext.Provider value={{ showToast, toastId }}>
      {children}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
        style={{
          width: 'auto',
          margin: '0 auto',
        }}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
