import React from "react";
import Navbar from "../Navbar";
import Info from "../Info";
import * as classnames from "./layout.module.scss";

const Layout = (props) => {
  return (
    <main className={classnames.main}>
      <header>
        <Navbar />
      </header>
      <section>
        <Info />
      </section>
      <article>
        {props.children}
      </article>
      <footer></footer>
    </main>
  );
}

export default Layout;
