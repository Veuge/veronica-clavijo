import React from "react";
import { Link } from "gatsby";

import * as classnames from "./header.module.scss";

const Header = () => {
  return (
    <div className={classnames.header}>
      <Link to="/">
        <h1>Este es un Hotfix</h1>
        <h4>
          escrito por <span>Verónica Clavijo</span>
        </h4>
      </Link>
    </div>
  );
};

export default Header;
