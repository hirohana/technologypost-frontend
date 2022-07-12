import { useState } from 'react';

const useLoadingStatus = () => {
  const [loading, setLoading] = useState(true);
  return { loading, setLoading };
};

export { useLoadingStatus };
