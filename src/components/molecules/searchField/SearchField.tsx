import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchField.module.scss';

type PROPS = {
  onSubmitHandler: any;
  values: string;
  changeValues: any;
};

const SearchField = (props: PROPS) => {
  const { onSubmitHandler, values, changeValues } = props;
  return (
    <>
      <form onSubmit={(e) => onSubmitHandler(e)} className={styles.form}>
        <div className={styles.container}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="search"
            id="search"
            name="search"
            autoComplete="search"
            autoFocus
            className={styles.textField}
            value={values}
            onChange={(e) => changeValues(e.target.value)}
            placeholder="検索入力"
          />
        </div>
      </form>
    </>
  );
};

export { SearchField };
