import React from "react";

// Links inside blog posts open in a new tab, except jumps to a heading on the same page.
const PostLink = ({ href = "", children, ...props }) => {
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};

export default PostLink;
