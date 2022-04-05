import React from "react";
import Navbar from "../navbar/Navbar";
import Info from "../info/Info";
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
