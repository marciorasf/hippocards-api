import React, { FunctionComponent, ReactNode } from "react";
import { Link } from "react-router-dom";

import { Menu as MenuIcon } from "@material-ui/icons";

import CustomIconButton from "../CustomIconButton";
import { Header } from "./styles";

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ children }: PageHeaderProps) => {
  return (
    <Header>
      <nav>
        <h1 className="brand">
          <Link className="nav-item" to="/">
            Flashcards
          </Link>
        </h1>
        <ul>
          <li>
            <Link className="nav-item" to="/study">
              Study
            </Link>
          </li>
          <li>
            <CustomIconButton>
              <MenuIcon />
            </CustomIconButton>
          </li>
        </ul>
      </nav>
      {children}
    </Header>
  );
};

export default PageHeader;
