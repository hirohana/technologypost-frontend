import { useEffect, useState } from 'react';

const useCard = (urlString: string | null) => {
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  useEffect(() => {
    if (!urlString) {
      return;
    }
    const urlArray = urlString.split(',');
    setImagesUrl(urlArray);
  }, [urlString]);

  return { imagesUrl };
};

export { useCard };
