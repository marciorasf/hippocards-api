import clsx from "clsx";
import React, { FunctionComponent, ReactNode, MouseEvent } from "react";

import { Clear as ClearIcon } from "@material-ui/icons";

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
      <main onClick={handleClickChildren}>
        <CloseButton onClick={onClose}>
          <ClearIcon />
        </CloseButton>

        {children}
      </main>
    </ModalContainer>
  );
};

export default Modal;
