import { Routes, Route } from "react-router-dom";
import { Contact, Error, Login, Home } from "components/pages";
import ArticlesRoutes from "./ArticlesRoutes";

const Router = () => {
  return (
    <Routes>
      <Route path="articles/*" element={<ArticlesRoutes />} />
      <Route path="contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Router;
