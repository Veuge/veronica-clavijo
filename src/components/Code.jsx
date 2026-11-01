import React from "react";
import { Highlight, themes } from "prism-react-renderer";

// prism-react-renderer v2 doesn't bundle bash or java. Order matters: prismSetup must run first.
import "./prismSetup";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-java";

const CodeBlock = (props) => {
  const className = props.children.props.className || "";
  const matches = className.match(/language-(?<lang>.*)/);
  return (
    <Highlight
      code={props.children.props.children.trim()}
      language={matches && matches.groups && matches.groups.lang ? matches.groups.lang : ""}
      theme={themes.oceanicNext}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, padding: "20px" }}
        >
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line })}
            >
              {line.map((token, key) => (
                <span
                  key={key}
                  {...getTokenProps({ token })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
