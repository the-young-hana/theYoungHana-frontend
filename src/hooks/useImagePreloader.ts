import { useState, useEffect } from "react";

const useImagePreloader = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = (arr: string[]) => {
      let loadedCount = 0;

      arr.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount += 1;
          if (loadedCount === arr.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount += 1;
          if (loadedCount === arr.length) {
            setImagesLoaded(true);
          }
        };
      });
    };

    preloadImages(imageUrls);
  }, [imageUrls]);

  return imagesLoaded;
};

export default useImagePreloader;
