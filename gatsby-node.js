const path = require("path");
const LANGUAGES = ["en", "es"];
const DEFAULT_LANGUAGE = "es";

// MDX collections: the gatsby-source-filesystem `name` they come from, the template
// that renders them and the URL prefix of their pages.
const COLLECTIONS = {
  blog: {
    template: path.resolve(`./src/templates/BlogPost.jsx`),
    basePath: "/posts"
  },
  projects: {
    template: path.resolve(`./src/templates/Project.jsx`),
    basePath: "/projects"
  },
};

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
    // "blog" | "projects": lets queries tell posts and projects apart.
    createNodeField({
      node,
      name: `collection`,
      value: fileNode.sourceInstanceName,
    });
  }
};

// Declare the optional project fields so queries work even when no MDX file sets them
// (blog posts never do).
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      cover: File @fileByRelativePath
      stack: [String]
      repo: String
      live: String
    }
  `);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              collection
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
    const collection = COLLECTIONS[node.fields.collection];
    if (!collection) return;

    const isSpanish = node.internal.contentFilePath.endsWith(".es.mdx");
    const language = isSpanish ? "es" : "en";
    const slug = node.fields.slug.replace(/\.es\/$/, "/");
    const originalPath = `${collection.basePath}${slug}`;
    const pagePath = language === DEFAULT_LANGUAGE ? originalPath : `/${language}${originalPath}`;

    createPage({
      path: pagePath,
      component: `${collection.template}?__contentFilePath=${node.internal.contentFilePath}`,
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
