import { useArticles } from "hooks/components/articles/useArticles";
import ArticlesCards from "components/organisms/ArticlesCards/ArticlesCards";
import TextField from "components/molecules/textField/TextField";
import { PaginationArticles } from "components/molecules/pagination/paginationArticles/PaginationArticles";
import styles from "./Articles.module.scss";

const Articles = () => {
  const { data, setData, searchKeyword, setSearchKeyword, getArticles } =
    useArticles("articles");
  return (
    <main>
      <div className={styles.container}>
        <TextField
          values={searchKeyword}
          changeValues={setSearchKeyword}
          onSubmitHandler={getArticles}
        />
        {data?.data ? (
          <>
            <ArticlesCards data={data.data} />
            <PaginationArticles
              maxPage={data.pagination.paginationMaxCount}
              setData={setData}
            />
          </>
        ) : null}
      </div>
    </main>
  );
};

export default Articles;
