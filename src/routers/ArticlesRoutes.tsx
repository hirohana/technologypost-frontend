import { Routes, Route } from "react-router-dom";
import {
  ArticlesSearch,
  Articles,
  Article,
  ArticleComplete,
  ArticleConfirm,
  ArticlePost,
  Error404,
  UserArticles,
} from "components/pages";

const ArticlesRoutes = () => {
  return (
    <Routes>
      <Route path="/article/:id" element={<Article />} />
      <Route path="/complete" element={<ArticleComplete />} />
      <Route path="/confirm" element={<ArticleConfirm />} />
      <Route path="/post" element={<ArticlePost />} />
      <Route path="userlist" element={<UserArticles />} />
      <Route path="/search" element={<ArticlesSearch />} />
      <Route path="/" element={<Articles />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default ArticlesRoutes;
