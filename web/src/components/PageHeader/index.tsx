import React from "react";
import { useHistory } from "react-router-dom";

import BrandImage from "../../assets/images/lightning.png";
import AuthService from "../../services/AuthService";
import {
  Header,
  Nav,
  Brand,
  BrandIcon,
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
          <Brand>
            <BrandIcon src={BrandImage} />
            Flashcards
          </Brand>
          <MenuList>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Nav>
      </HeaderContent>
    </Header>
  );
}

export default PageHeader;
