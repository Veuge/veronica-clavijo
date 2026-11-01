import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Navbar from "../navbar/Navbar";
import Info from "../info/Info";
import { HOME, NOT_FOUND, WHOAMI } from "../../helpers";
import * as classnames from "./layout.module.scss";

const Layout = ({ section, children, style }) => {
  return (
    <Fragment>
      <main className={classnames.main}>
        <header>
          <Navbar />
        </header>
        <div
          className={classnames.body}
          style={style || {}}
        >
          <article>{children}</article>
        </div>
        {![HOME, WHOAMI, NOT_FOUND].includes(section) && (
          <footer
            style={{ display: "flex", justifyContent: "center", width: "70%", margin: "auto" }}
          >
            <Info />
          </footer>
        )}
      </main>
    </Fragment>
  );
};

Layout.propTypes = {
  section: PropTypes.oneOf(["home", "posts", "projects", "whoAmI", "notFound"]).isRequired,
};

export default Layout;
