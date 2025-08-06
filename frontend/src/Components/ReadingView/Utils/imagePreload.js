// Utilidad para precargar imágenes
export function imagePreload(imageUrls, onLoad, onError) {
  let loaded = 0;
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    if (onLoad) onLoad();
    return;
  }
  imageUrls.forEach((url) => {
    const img = new window.Image();
    img.onload = () => {
      loaded++;
      if (loaded === imageUrls.length && onLoad) onLoad();
    };
    img.onerror = onError;
    img.src = url;
  });
}

export default imagePreload;
