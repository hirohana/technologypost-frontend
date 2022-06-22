import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  UserArticleComplete,
  UserArticleConfirm,
  UserArticlePost,
  UserArticleList,
  Error404,
} from "components/pages";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/:username/article_list" element={<UserArticleList />} />
      <Route path="/:username/article_post/:id" element={<UserArticlePost />} />
      <Route
        path="/:username/article_confirm/:id"
        element={<UserArticleConfirm />}
      />
      <Route
        path="/:username/article_complete/:id"
        element={<UserArticleComplete />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
export default UserRoutes;
