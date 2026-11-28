module.exports = {
  siteMetadata: {
    title: "veronica-clavijo",
    author: "Verónica Clavijo",
    siteUrl: "https://veuge.github.io",
    twitterUsername: "@Veuge_C",
    description: "Apuntes de React, ReactNative, JS y algunas cosas mas.",
    links: {
      twitter: "https://twitter.com/Veuge_C",
      github: "https://github.com/Veuge",
      linkedin: "https://www.linkedin.com/in/veronica-clavijo-altamirano/",
      email: "veuge.clavijo@gmail.com",
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locale`,
        path: `${__dirname}/locales`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `images`, path: `${__dirname}/src/images` },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `blog`, path: `${__dirname}/src/content/blog` },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `projects`, path: `${__dirname}/src/content/projects` },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            // Adds an id + hover "#" link to every heading, so sections can be linked to.
            // Slugs match the ones used by the Mdx `tableOfContents` field (both use github-slugger).
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `heading-anchor`,
              icon: `<span aria-hidden="true">#</span>`,
              isIconAfterHeader: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              wrapperStyle: () => `margin-block: 1rem;`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`en`, `es`],
        defaultLanguage: `es`,
        siteUrl: `https://veuge.github.io`,
        trailingSlash: `always`,
        i18nextOptions: {
          interpolation: { escapeValue: false },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
  ],
};
