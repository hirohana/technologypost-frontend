import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Article, Contact, Error, Login, Home } from "components/pages";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="article" element={<Article />} />
      <Route path="contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Router;
