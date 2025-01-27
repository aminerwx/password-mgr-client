import React, { DialogHTMLAttributes } from "react";

interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {}

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return <dialog {...props}>{children}</dialog>;
};

export default Modal;
