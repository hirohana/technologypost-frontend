import { useSelector } from 'react-redux';
import { isLoadingSelector } from 'reducks/loading/selector';

const useIsLoading = () => {
  const { isLoading } = useSelector(isLoadingSelector);
  return { isLoading };
};

export { useIsLoading };
