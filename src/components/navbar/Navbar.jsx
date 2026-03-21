import React from "react";
import { Link } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import { composeClasses } from "../../helpers/index";
import Header from "./Header";
import * as styles from "./navbar.module.scss";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <nav className={styles.navbar}>
      <Header />
      <div className={styles.nav}>
        <Link
          className={composeClasses(styles.navLink, styles.navLinkGreen)}
          to="/posts"
          activeClassName={styles.activeNavLink}
        >
          {t('blog_section')}
        </Link>
        {/* <Link
          className={composeClasses(styles.navLink, styles.navLinkRed)}
          to="/projects"
          activeClassName={styles.activeNavLink}
        >
          Proyectos
        </Link> */}
        <Link
          className={composeClasses(styles.navLink, styles.navLinkBlue)}
          to="/whoami"
          activeClassName={styles.activeNavLink}
        >
          $ whoami
        </Link>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
