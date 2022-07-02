import { Menu } from '@mui/material';
import { useState } from 'react';
import styles from './SelectPulldown.module.scss';

type PROPS = {
  setCategory: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
      }[]
    >
  >;
  menus: { id: number; name: string }[];
};

const SelectPulldown = (props: PROPS) => {
  const { setCategory, menus } = props;
  const [selectedBox, setSelectedBox] = useState('');

  const onSelectClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedBox.includes(e.target.value)) {
      return;
    }
    const copySelectedBox = selectedBox;
    const newSelectedBox = `${copySelectedBox} ${e.target.value}`;
    setSelectedBox(newSelectedBox);

    let arry: { id: number; name: string }[] = [];
    for (const category of newSelectedBox) {
      const menuObj = menus.filter((menu) => menu.name === category);
      arry.push(menuObj[0]);
    }
    setCategory(arry);
  };

  return (
    <div className={styles.container}>
      <div className={styles.select_pulldown}>
        <select
          className={styles.select_pulldown__open}
          onChange={(e) => onSelectClick(e)}
        >
          {menus.map((menu) => (
            <option value={menu.name} key={menu.name}>
              {menu.name}
            </option>
          ))}
        </select>
        <textarea
          value={selectedBox}
          onChange={(e) => setSelectedBox(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export { SelectPulldown };
