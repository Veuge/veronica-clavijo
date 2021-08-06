import React from "react";
import { Link } from "gatsby";

import { composeClasses } from "../helpers";
import * as styles from "../styles/navbar.module.scss";

export default function Navbar() {
  console.log(styles.navLink);
  return (
    <nav className={styles.navbar}>
      <div className={styles.nav}>
        <Link
          className={composeClasses(styles.navLink, styles.navLinkGreen)}
          to="/"
          activeClassName={styles.activeNavLink}
        >
          Anotaciones
        </Link>
        <Link
          className={composeClasses(styles.navLink, styles.navLinkRed)}
          to="/proyectos"
          activeClassName={styles.activeNavLink}
        >
          Proyectos
        </Link>
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
