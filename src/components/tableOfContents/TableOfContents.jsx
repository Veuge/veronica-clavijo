import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "gatsby-plugin-react-i18next";

import { composeClasses } from "../../helpers";
import * as styles from "./tableOfContents.module.scss";

// Distance (px) from the top of the viewport at which a heading counts as "current".
// Leaves room for the sticky navbar.
const ACTIVE_OFFSET = 120;

// Turns the nested `tableOfContents` tree from gatsby-plugin-mdx into a flat list.
const flatten = (items = [], depth = 0) =>
  items.flatMap(({ url, title, items: children }) => [
    ...(url && title ? [{ id: decodeURIComponent(url.slice(1)), url, title, depth }] : []),
    ...flatten(children, depth + 1),
  ]);

const useActiveHeading = (ids) => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (ids.length === 0) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      let current = null;
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          current = id;
        }
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return activeId;
};

const TableOfContents = ({ toc }) => {
  const { t } = useTranslation();
  const headings = useMemo(() => flatten(toc?.items), [toc]);
  const ids = useMemo(() => headings.map(({ id }) => id), [headings]);
  const activeId = useActiveHeading(ids);

  // A single heading isn't worth navigating.
  if (headings.length < 2) return null;

  const list = (
    <ol className={styles.list}>
      {headings.map(({ id, url, title, depth }) => (
        <li
          key={url}
          className={composeClasses(styles.item, id === activeId && styles.active)}
          style={{ "--depth": depth }}
        >
          <a
            href={url}
            aria-current={id === activeId ? "location" : undefined}
          >
            <span
              className={styles.dash}
              aria-hidden="true"
            />
            <span className={styles.title}>{title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* Small screens: collapsible list at the top of the post */}
      <details className={styles.inline}>
        <summary>{t("table_of_contents")}</summary>
        <nav aria-label={t("table_of_contents")}>{list}</nav>
      </details>

      {/* Large screens: dash rail on the right that expands on hover/focus */}
      <nav
        className={styles.rail}
        aria-label={t("table_of_contents")}
      >
        {list}
      </nav>
    </>
  );
};

TableOfContents.propTypes = {
  toc: PropTypes.shape({ items: PropTypes.array }),
};

export default TableOfContents;
