/* eslint-disable @typescript-eslint/no-explicit-any*/
import { memo } from "react";
import { useInView } from "react-intersection-observer";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import styles from "./AsideScrollTop.module.scss";

const AsideScrollTop = memo(() => {
  const { ref, inView } = useInView({
    rootMargin: "200px",
    triggerOnce: false,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <aside className={styles.side_left} ref={ref}>
      <button
        className={
          inView ? styles.side_left_inner : styles.side_left_inner__appear
        }
      >
        <ArrowUpwardIcon onClick={scrollToTop} />
      </button>
    </aside>
  );
});

export default AsideScrollTop;
