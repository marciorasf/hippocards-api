import React from "react";
import { useHistory } from "react-router-dom";

import AuthService from "../../services/AuthService";
import {
  Header,
  Nav,
  Brand,
  MenuList,
  MenuItem,
  HeaderContent,
} from "./styles";

function PageHeader() {
  const history = useHistory();

  function handleLogout() {
    AuthService.logout();
    history.push("/login");
  }

  return (
    <Header>
      <HeaderContent>
        <Nav>
          <Brand>Flashcards</Brand>
          <MenuList>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Nav>
      </HeaderContent>
    </Header>
  );
}

export default PageHeader;
