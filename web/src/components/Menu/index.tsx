import React, { FunctionComponent } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { useHistory } from "react-router-dom";

import AuthService from "../../services/AuthService";
import { Container, CloseButton, MenuList, MenuItem } from "./styles";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

const Menu: FunctionComponent<MenuProps> = ({ open, onClose }: MenuProps) => {
  const history = useHistory();

  function handleLogout() {
    AuthService.logout();
    history.push("/login");
  }

  return (
    <Container className={!open ? "is-hidden" : undefined}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <MenuList>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Container>
  );
};

export default Menu;
