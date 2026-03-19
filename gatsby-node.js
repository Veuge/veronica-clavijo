const path = require("path");
const LANGUAGES = ["en", "es"];
const DEFAULT_LANGUAGE = "es";

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent);
    const slug = `/${fileNode.relativeDirectory}/`;

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`./src/templates/BlogPost.jsx`);

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  result.data.allMdx.edges.forEach(({ node }) => {
    const isSpanish = node.internal.contentFilePath.endsWith(".es.mdx");
    const language = isSpanish ? "es" : "en";
    const slug = node.fields.slug.replace(/\.es\/$/, "/");
    const pagePath = language === DEFAULT_LANGUAGE ? `/posts${slug}` : `/${language}/posts${slug}`;
    const originalPath = `/posts${slug}`;

    createPage({
      path: pagePath,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        slug,
        language,
        i18n: {
          language,
          languages: LANGUAGES,
          defaultLanguage: DEFAULT_LANGUAGE,
          generateDefaultLanguagePage: false,
          routed: language !== DEFAULT_LANGUAGE,
          originalPath,
          path: pagePath,
        },
      },
    });
  });
};
