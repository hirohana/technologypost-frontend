import { Routes, Route } from "react-router-dom";
import {
  Articles,
  Article,
  Contact,
  Error,
  Login,
  Home,
} from "components/pages";

const Router = () => {
  return (
    <Routes>
      <Route path="articles/article/:id" element={<Article />} />
      <Route path="articles/search" element={<Articles />} />
      <Route path="articles" element={<Articles />} />
      <Route path="contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Router;
