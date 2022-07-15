import { useSelector } from 'react-redux';
import { selectMenuOpen } from 'reducks/menuOpen/selector';

const useMenuOpen = (): boolean => {
  const { menuOpen } = useSelector(selectMenuOpen);
  return menuOpen;
};

export default useMenuOpen;
