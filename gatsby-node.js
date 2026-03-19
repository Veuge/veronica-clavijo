const { createFilePath } = require("gatsby-source-filesystem");
const templatePath = require("path");

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type !== "Mdx") {
    return;
  }

  actions.createNodeField({
    node,
    name: "slug",
    value: createFilePath({ node, getNode }),
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query BlogPostSlugs {
      allMdx {
        nodes {
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
  `);

  data.allMdx.nodes.forEach((node) => {
    actions.createPage({
      path: `/posts${node.fields.slug}`,
      component: `${templatePath.resolve(
        "./src/templates/BlogPost.jsx"
      )}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
  });
};
