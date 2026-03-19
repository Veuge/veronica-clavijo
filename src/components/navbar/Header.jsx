import React from "react";
import { Link } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import * as classnames from "./header.module.scss";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className={classnames.header}>
      <Link to="/">
        <h1>{t("name")}</h1>
        <h4>
          {t("description")} <span>Verónica Clavijo</span>
        </h4>
      </Link>
    </div>
  );
};

export default Header;
