import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";

import { sectionNameColors } from "../../helpers";

const LANGUAGES = ["es", "en"];
const DEFAULT_LANGUAGE = "es";
const OG_LOCALES = { en: "en_US", es: "es_LA" };

// Gatsby's Head API renders outside the i18next provider, so read translations from the page query.
const getTranslations = (data) => {
  const node = data?.locales?.edges?.find(({ node }) => node.ns === "translation")?.node;
  try {
    return node ? JSON.parse(node.data) : {};
  } catch {
    return {};
  }
};

const localizedPath = (originalPath, language) =>
  language === DEFAULT_LANGUAGE ? originalPath : `/${language}${originalPath}`;

const Seo = ({
  data,
  location,
  pageContext,
  section,
  title,
  description,
  type = "website",
  publishedTime,
  noindex = false,
}) => {
  const { site, file } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          author
          siteUrl
          twitterUsername
        }
      }
      file(relativePath: { eq: "profile3.jpg" }) {
        childImageSharp {
          resize(width: 600, height: 600, cropFocus: CENTER) {
            src
            width
            height
          }
        }
      }
    }
  `);

  const { author, siteUrl, twitterUsername } = site.siteMetadata;
  const t = getTranslations(data);
  const language = pageContext?.language || DEFAULT_LANGUAGE;
  const originalPath = pageContext?.i18n?.originalPath || location.pathname;

  const sectionTitle = section ? t[sectionNameColors[section].titleKey] : undefined;
  const fullTitle = title
    ? `${title} | ${author}`
    : [author, sectionTitle].filter(Boolean).join(" | ");
  const metaDescription = description || t.seo_description || t.short_description;
  const url = `${siteUrl}${location.pathname}`;
  const image = file?.childImageSharp?.resize;
  const imageUrl = image ? `${siteUrl}${image.src}` : undefined;

  return (
    <>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta
        name="description"
        content={metaDescription}
      />
      <meta
        name="author"
        content={author}
      />
      {noindex && (
        <meta
          name="robots"
          content="noindex"
        />
      )}

      {!noindex && (
        <link
          rel="canonical"
          href={url}
        />
      )}
      {!noindex &&
        LANGUAGES.map((lng) => (
          <link
            key={lng}
            rel="alternate"
            hrefLang={lng}
            href={`${siteUrl}${localizedPath(originalPath, lng)}`}
          />
        ))}
      {!noindex && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${siteUrl}${localizedPath(originalPath, DEFAULT_LANGUAGE)}`}
        />
      )}

      <meta
        property="og:type"
        content={type}
      />
      <meta
        property="og:site_name"
        content={author}
      />
      <meta
        property="og:title"
        content={fullTitle}
      />
      <meta
        property="og:description"
        content={metaDescription}
      />
      <meta
        property="og:url"
        content={url}
      />
      <meta
        property="og:locale"
        content={OG_LOCALES[language]}
      />
      {LANGUAGES.filter((lng) => lng !== language).map((lng) => (
        <meta
          key={lng}
          property="og:locale:alternate"
          content={OG_LOCALES[lng]}
        />
      ))}
      {imageUrl && (
        <>
          <meta
            property="og:image"
            content={imageUrl}
          />
          <meta
            property="og:image:width"
            content={String(image.width)}
          />
          <meta
            property="og:image:height"
            content={String(image.height)}
          />
          <meta
            property="og:image:alt"
            content={t.profile_photo_alt}
          />
        </>
      )}
      {type === "article" && publishedTime && (
        <meta
          property="article:published_time"
          content={publishedTime}
        />
      )}

      <meta
        name="twitter:card"
        content="summary"
      />
      <meta
        name="twitter:site"
        content={twitterUsername}
      />
      <meta
        name="twitter:creator"
        content={twitterUsername}
      />
      <meta
        name="twitter:title"
        content={fullTitle}
      />
      <meta
        name="twitter:description"
        content={metaDescription}
      />
      {imageUrl && (
        <>
          <meta
            name="twitter:image"
            content={imageUrl}
          />
          <meta
            name="twitter:image:alt"
            content={t.profile_photo_alt}
          />
        </>
      )}
    </>
  );
};

Seo.propTypes = {
  data: PropTypes.object,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  pageContext: PropTypes.object,
  section: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.oneOf(["website", "article"]),
  publishedTime: PropTypes.string,
  noindex: PropTypes.bool,
};

export default Seo;
