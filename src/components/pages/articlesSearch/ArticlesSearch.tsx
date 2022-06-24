import ArticlesCards from "components/organisms/ArticlesCards/ArticlesCards";
import TextField from "components/molecules/textField/TextField";
import { Pagination } from "components/molecules/pagination/Pagination";
import styles from "./ArticlesSearch.module.scss";
import { useArticles } from "hooks/components/articles/useArticles";

const ArticlesSearch = () => {
  const {
    data,
    setData,
    searchKeyword,
    setSearchKeyword,
    getArticlesBySearch,
  } = useArticles("articles/search");

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
            <ArticlesCards data={data.data} />
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
