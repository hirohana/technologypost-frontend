import { Cards } from "components/organisms/cards/Cards";
import TextField from "components/molecules/textField/TextField";
import { Pagination } from "components/molecules/pagination/Pagination";
import styles from "./ArticlesSearch.module.scss";
import { useArticles } from "hooks/components/articles/useArticles";

const ArticlesSearch = () => {
  const { data, searchKeyword, setSearchKeyword, getArticlesBySearch } =
    useArticles();

  return (
    <main>
      <div className={styles.container}>
        <TextField
          values={searchKeyword}
          changeValues={setSearchKeyword}
          onSubmitHandler={getArticlesBySearch}
        />
        {data?.data ? (
          <>
            <Cards data={data.data} />
            <Pagination
              maxPage={data.pagination.paginationMaxCount}
              url="articles/search"
            />
          </>
        ) : null}
      </div>
    </main>
  );
};

export default ArticlesSearch;
