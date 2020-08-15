import clsx from "clsx";
import React, { FunctionComponent, ReactNode, MouseEvent } from "react";
import { MdClose as CloseIcon } from "react-icons/md";

import { ModalContainer, CloseButton } from "./styles";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

const Modal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
  children,
}: ModalProps) => {
  function handleClickChildren(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  return (
    <ModalContainer className={clsx({ isOpen: open })} onClick={onClose}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <main onClick={handleClickChildren}>{children}</main>
    </ModalContainer>
  );
};

export default Modal;
