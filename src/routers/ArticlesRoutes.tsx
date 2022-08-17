import { Routes, Route } from "react-router-dom";
import { Articles, Article, Error404 } from "components/pages";
import UserRoutes from "./UserRoutes";

const ArticlesRoutes = () => {
  return (
    <Routes>
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="/articles/:id" element={<Article />} />
      <Route path="/" element={<Articles />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default ArticlesRoutes;
