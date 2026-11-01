import React from "react";
import { graphql } from "gatsby";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/layout/Layout";
import { NOT_FOUND } from "../helpers";
import * as styles from "../styles/notFound.module.scss";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Layout section={NOT_FOUND}>
      <section className={styles.notFound}>
        <div className={styles.terminal}>
          <h1 className={styles.command}>
            <span className={styles.prompt}>$</span> {t("not_found_command")}
          </h1>
          <p className={styles.error}>{t("not_found_error")}</p>
        </div>
        <p>{t("not_found_message")}</p>
        <Link
          to="/posts/"
          className={styles.link}
        >
          {t("not_found_link")}
        </Link>
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
