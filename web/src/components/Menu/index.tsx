import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";

import { Close as MenuIcon } from "@material-ui/icons";

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
        <MenuIcon />
      </CloseButton>
      <MenuList>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Container>
  );
};

export default Menu;
