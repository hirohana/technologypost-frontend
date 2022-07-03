import { TextField } from '@mui/material';
import { useState } from 'react';
import styles from './SelectPulldown.module.scss';

type PROPS = {
  menus: { id: number; name: string }[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const SelectPulldown = (props: PROPS) => {
  const { menus, selectedCategory, setSelectedCategory } = props;

  const onSelectClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedCategory.includes(e.target.value)) {
      return;
    }
    const copySelectedBox = selectedCategory;
    const newSelectedBox = `${copySelectedBox} ${e.target.value}`;
    setSelectedCategory(newSelectedBox);
  };

  return (
    <div className={styles.container}>
      <div className={styles.select_pulldown}>
        <select
          className={styles.select_pulldown__open}
          onChange={(e) => onSelectClick(e)}
        >
          {menus.map((menu) => (
            <option value={`${menu.id}.${menu.name}`} key={menu.name}>
              {menu.id}.{menu.name}
            </option>
          ))}
        </select>
        <TextField
          variant="outlined"
          fullWidth
          multiline={true}
          label="カテゴリー一覧"
          className={styles.textfiled}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
      </div>
    </div>
  );
};

export { SelectPulldown };
