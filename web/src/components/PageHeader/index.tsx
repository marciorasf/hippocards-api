import React, { FunctionComponent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import { Menu as MenuIcon } from "@material-ui/icons";

import CustomIconButton from "../CustomIconButton";
import Menu from "../Menu";
import { Header, Nav, Brand, MenuList, MenuItem } from "./styles";

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ children }: PageHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOpenMenu() {
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <Header>
      <Nav>
        <Brand>
          <Link className="nav-item" to="/">
            Flashcards
          </Link>
        </Brand>
        <MenuList>
          <MenuItem>
            <Link className="nav-item" to="/study">
              Study
            </Link>
          </MenuItem>
          <MenuItem>
            <CustomIconButton onClick={handleOpenMenu}>
              <MenuIcon />
            </CustomIconButton>
          </MenuItem>
        </MenuList>
      </Nav>
      <Menu open={isMenuOpen} onClose={handleCloseMenu} />
      {children}
    </Header>
  );
};

export default PageHeader;
