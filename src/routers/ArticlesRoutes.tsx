import { Routes, Route } from "react-router-dom";
import {
  ArticlesSearch,
  Articles,
  Article,
  ArticleComplete,
  ArticleConfirm,
  ArticlePost,
} from "components/pages";

const ArticlesRoutes = () => {
  return (
    <Routes>
      <Route path="/article/:id" element={<Article />} />
      <Route path="/complete" element={<ArticleComplete />} />
      <Route path="/confirm" element={<ArticleConfirm />} />
      <Route path="/post" element={<ArticlePost />} />
      <Route path="/search" element={<ArticlesSearch />} />
      <Route path="/" element={<Articles />} />
    </Routes>
  );
};

export default ArticlesRoutes;
