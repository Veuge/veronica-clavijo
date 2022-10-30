import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Navbar from "../navbar/Navbar";
import Info from "../info/Info";
import { HOME, sectionNameColors } from "../../helpers";
import * as classnames from "./layout.module.scss";

const Layout = ({ section, children, style }) => {
  return (
    <Fragment>
      <title>Verónica Clavijo | {sectionNameColors[section].title}</title>
      <main className={classnames.main}>
        <header>
          <Navbar />
        </header>
        <div className={classnames.body} style={style || {}}>
          <article>
            {children}
          </article>
          {section !== HOME && (
            <footer>
              <Info />
            </footer>
          )}
        </div>
      </main>
    </Fragment>
  );
}

Layout.propTypes = {
  section: PropTypes.oneOf(["home", "posts", "projects", "whoAmI"]).isRequired
}

export default Layout;
