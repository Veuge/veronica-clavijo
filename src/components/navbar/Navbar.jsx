import React from "react";
import { Link } from "gatsby";

import { composeClasses } from "../../helpers/index";
import Header from "./Header";

import * as styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Header />
      <div className={styles.nav}>
        <Link
          className={composeClasses(styles.navLink, styles.navLinkGreen)}
          to="/posts"
          activeClassName={styles.activeNavLink}
        >
          Anotaciones
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
      </div>
    </nav>
  );
};
