import React from 'react';
import styles from './SelectPulldown.module.scss';

const options = [
  'a,',
  'b',
  'c,',
  'd',
  'e,',
  'f',
  'g,',
  'h',
  'i,',
  'j',
  'a,',
  'b',
  'c,',
  'd',
  'e,',
  'f',
  'g,',
  'h',
  'i,',
  'j',
];

const SelectPulldown = () => {
  return (
    <div className={styles.select_pulldown}>
      <select className={styles.select_pulldown__open}>
        {options.map((option) => (
          <option value="雑記">雑記</option>
        ))}
      </select>
    </div>
  );
};

export default SelectPulldown;
