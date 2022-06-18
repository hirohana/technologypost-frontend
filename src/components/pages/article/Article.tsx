import { useParams } from "react-router-dom";

import styles from "./Article.module.scss";

const Article = () => {
  const { id } = useParams();
  return <div>Article: {id}</div>;
};

export default Article;
