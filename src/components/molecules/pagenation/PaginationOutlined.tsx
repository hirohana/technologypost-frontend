import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { config } from "config/applicationConfig";
import styles from "./PaginationOutlined.module.scss";

type PROPS = {
  maxPage: number;
  setData: any;
};
export default function PaginationOutlined(props: PROPS) {
  const { maxPage, setData } = props;
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const currentPage = Number(query.get("page"));

  const changeCurrentPage = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    event.preventDefault();
    try {
      navigate(`/articles/?page=${page}`);
      const response = await fetch(
        `${config.BACKEND_URL}/articles/?page=${page}`
      );
      setData(await response.json());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <Stack spacing={2}>
        <Pagination
          page={currentPage}
          count={maxPage}
          variant="outlined"
          color="primary"
          size="medium"
          hideNextButton={true}
          hidePrevButton={true}
          onChange={(event, page) => changeCurrentPage(event, page)}
        />
      </Stack>
    </div>
  );
}
export { PaginationOutlined };
