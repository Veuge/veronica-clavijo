import React from "react";
import PropTypes from "prop-types";
import { useI18next } from "gatsby-plugin-react-i18next";
import { getImage } from "gatsby-plugin-image";

import PreviewCard from "../previewCard/PreviewCard";
import { filterByLanguage, normalizeSlug } from "../../helpers";
import * as styles from "./projectpreviews.module.scss";

// `projects`: allMdx edges from the /projects page query (all languages).
export default function ProjectPreviews({ projects: allProjects }) {
  const { language } = useI18next();

  const projects = filterByLanguage(allProjects, language);

  return (
    <div className={styles.grid}>
      {projects.map(({ node }) => {
        const { title, description, dateEn, dateEs, cover } = node.frontmatter;
        return (
          <PreviewCard
            key={node.id}
            to={`/projects${normalizeSlug(node.fields.slug)}`}
            language={language}
            image={getImage(cover)}
            imageAlt={title}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <span className={styles.date}>{language === "es" ? dateEs : dateEn}</span>
            </div>
            <p className={styles.description}>{description}</p>
          </PreviewCard>
        );
      })}
    </div>
  );
}

ProjectPreviews.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({ node: PropTypes.object })).isRequired,
};
