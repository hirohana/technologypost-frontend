import ArticlesCards from "components/organisms/ArticlesCards/ArticlesCards";
import TextField from "components/molecules/textField/TextField";
import { useArticlesById } from "hooks/components/articles/useArticlesById";
import { PaginationOutlined } from "components/molecules/pagination/PaginationOutlined";
import { useArticlesByCreatedAt } from "hooks/components/articles/useArticlesByCreatedAt";
import { useArticlesBySearch } from "hooks/components/articles/useArticlesBySearch";
import styles from "./ArticlesCards.module.scss";

const Articles = () => {
  // const { articleIdData, getArticlesById } = useArticlesById();
  const { articlesByCreatedAtData, setArticlesByCreatedAtData } =
    useArticlesByCreatedAt();
  const { searchWords, setSearchWords, getArticlesBySearch } =
    useArticlesBySearch();
  console.log(articlesByCreatedAtData);
  return (
    <main>
      <div className={styles.container}>
        <TextField
          values={searchWords}
          changeValues={setSearchWords}
          onSubmitHandler={getArticlesBySearch}
        />
        {articlesByCreatedAtData?.data ? (
          <>
            <ArticlesCards data={articlesByCreatedAtData.data} />
            <PaginationOutlined
              maxPage={articlesByCreatedAtData.pagination.paginationMaxCount}
              setData={setArticlesByCreatedAtData}
            />
          </>
        ) : null}
      </div>
    </main>
  );
};

export default Articles;
// import ArticlesCards from "components/organisms/ArticlesCards/ArticlesCards";
// import TextField from "components/molecules/textField/TextField";
// import { useArticlesById } from "hooks/components/articles/useArticlesById";
// import { PaginationOutlined } from "components/molecules/pagination/PaginationOutlined";
// import { useArticlesByCreatedAt } from "hooks/components/articles/useArticlesByCreatedAt";
// import { useArticlesBySearch } from "hooks/components/articles/useArticlesBySearch";
// import styles from "./ArticlesCards.module.scss";

// const Articles = () => {
//   // const { articleIdData, getArticlesById } = useArticlesById();
//   const { articlesByCreatedAtData, setArticlesByCreatedAtData } =
//     useArticlesByCreatedAt();
//   const { searchWords, setSearchWords, getArticlesBySearch } =
//     useArticlesBySearch();
//   console.log(articlesByCreatedAtData);
//   return (
//     <main>
//       <div className={styles.container}>
//         <TextField
//           values={searchWords}
//           changeValues={setSearchWords}
//           onSubmitHandler={getArticlesBySearch}
//         />
//         {articlesByCreatedAtData?.data ? (
//           <>
//             <ArticlesCards data={articlesByCreatedAtData.data} />
//             <PaginationOutlined
//               maxPage={articlesByCreatedAtData.pagination.paginationMaxCount}
//               setData={setArticlesByCreatedAtData}
//             />
//           </>
//         ) : null}
//       </div>
//     </main>
//   );
// };

// export default Articles;
