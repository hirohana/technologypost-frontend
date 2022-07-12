import styles from './HumbergarButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { menuOpenChange } from 'reducks/menuOpen/actionCreator';
import { selectMenuOpen } from 'reducks/menuOpen/selector';

const HumbergarButton = () => {
  const dispatch = useDispatch();
  const { menuOpen } = useSelector(selectMenuOpen);

  return (
    <>
      <button
        className={`${styles.humbergar_menu__btn} ${
          menuOpen ? styles.menuOpen : ''
        }`}
        onClick={() => dispatch(menuOpenChange(menuOpen))}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
};

export { HumbergarButton };
