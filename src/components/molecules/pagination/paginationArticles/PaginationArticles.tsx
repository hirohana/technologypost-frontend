import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { usePagination } from "hooks/components/pagination/pagination";
import styles from "./PaginationArticles.module.scss";

type PROPS = {
  maxPage: number;
  setData: any;
};

const PaginationArticles = (props: PROPS) => {
  const { maxPage, setData } = props;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const queryPage = Number(query.get("page")) || 1;
  const queryKeyword = query.get("keyword") || "";
  const { changeCurrentPage } = usePagination();

  return (
    <div className={styles.container}>
      <Stack spacing={2}>
        <Pagination
          page={queryPage}
          count={maxPage}
          variant="outlined"
          color="primary"
          size="medium"
          hideNextButton={true}
          hidePrevButton={true}
          onChange={(event, page) => changeCurrentPage(event, page, setData)}
        />
      </Stack>
    </div>
  );
};
export { PaginationArticles };
