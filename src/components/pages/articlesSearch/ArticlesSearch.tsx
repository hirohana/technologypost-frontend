import ArticlesCards from "components/organisms/ArticlesCards/ArticlesCards";
import TextField from "components/molecules/textField/TextField";
import { PaginationArticlesSearch } from "components/molecules/pagination/paginationArticlesSearch/PaginationArticlesSearch";
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
            <PaginationArticlesSearch
              maxPage={data.pagination.paginationMaxCount}
              setData={setData}
            />
          </>
        ) : null}
      </div>
    </main>
  );
};

export default ArticlesSearch;
