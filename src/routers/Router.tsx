import { Routes, Route } from 'react-router-dom';
import { About, Contact, Error404, Login, Home } from 'components/pages';
import ArticlesRoutes from './ArticlesRoutes';

const Router = () => {
  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/*" element={<ArticlesRoutes />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
