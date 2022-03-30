module.exports = {
  siteMetadata: {
    title: "veronica-clavijo",
    author: "Verónica Clavijo",
    description: "Apuntes de React, ReactNative, JS y algunas cosas mas.",
    links: {
      twitter: "https://twitter.com/Veuge_C",
      github: "https://github.com/Veuge",
      linkedin: "https://www.linkedin.com/in/veronica-clavijo-altamirano/",
      email: "veuge.clavijo@gmail.com"
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/content/blog`
      }
    },
    `gatsby-plugin-image`,
    `gatsby-remark-images`,
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
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      }
    }
  ],
};
