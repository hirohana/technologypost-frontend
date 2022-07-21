import styles from './SearchResultNotFound.module.scss';

type PROPS = {
  keyword: string;
};

const SearchResultNotFound = (props: PROPS) => {
  const { keyword } = props;

  return (
    <div className={styles.container}>
      <div className={styles.keyword_container}>
        <span className={styles.keyword}>{keyword}</span>
        <p>に一致する情報が見つかりませんでした。</p>
      </div>
    </div>
  );
};

export default SearchResultNotFound;
