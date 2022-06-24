import { useLocation, useNavigate } from "react-router-dom";
import MuiPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import styles from "./Pagination.module.scss";

type PROPS = {
  maxPage: number;
  url: string;
};

const Pagination = (props: PROPS) => {
  const { maxPage, url } = props;
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const queryPage = Number(query.get("page")) || 1;
  const queryKeyword = query.get("keyword") || "";

  const changeCurrentPage = (page: number) => {
    navigate(`/${url}/?keyword=${queryKeyword}&page=${page}`);
  };

  return (
    <div className={styles.container}>
      <Stack spacing={2}>
        <MuiPagination
          page={queryPage}
          count={maxPage}
          variant="outlined"
          color="primary"
          size="medium"
          hideNextButton={true}
          hidePrevButton={true}
          onChange={(event, page) => changeCurrentPage(page)}
        />
      </Stack>
    </div>
  );
};
export { Pagination };
