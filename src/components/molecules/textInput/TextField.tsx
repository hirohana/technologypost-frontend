import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

import styles from "./TextField.module.scss";

const TextField = () => {
  const [searchWords, setSearchWords] = useState("");

  const searchInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchWords);
  };

  return (
    <>
      <form onSubmit={(e) => searchInput(e)} className={styles.form}>
        <div className={styles.container}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="search"
            id="search"
            name="search"
            autoComplete="search"
            autoFocus
            className={styles.textField}
            value={searchWords}
            onChange={(e) => setSearchWords(e.target.value)}
            placeholder="検索入力"
          />
        </div>
      </form>
    </>
  );
};

export default TextField;
