import { Link } from "react-router-dom";

import { config } from "config/applicationConfig";
import styles from "./PaginationOutlined.module.scss";

type PROPS = {
  pageCount: number;
  setData: any;
};
export default function PaginationOutlined(props: PROPS) {
  const { pageCount, setData } = props;
  const pageCountArray = [];

  const changePageCurrent = async (i: number) => {
    const response = await fetch(`${config.BACKEND_URL}/articles/?page=${i}`);
    setData(await response.json());
  };

  for (let i = 1; i <= pageCount; i++) {
    const ele = (
      <Link
        to={`/articles/?page=${i}`}
        onClick={() => changePageCurrent(i)}
        key={i}
      >
        {i}
      </Link>
    );
    pageCountArray.push(ele);
  }

  return (
    <>
      <ul>{pageCountArray}</ul>
    </>
  );
}

export { PaginationOutlined };
