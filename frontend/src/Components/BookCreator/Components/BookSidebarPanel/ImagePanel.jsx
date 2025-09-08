import { useState } from 'react';
import { getShapesImages, getObjectImages, getPersonsImages, getBackgroundImages } from "../../../../api/images";
import UploadMedia from '../../UploadMedia/uploadMedia';

export default function ImagePanel({ widgetValidation, setElements, setImages, imageType, }) {
  const getCanvasWidth = () => {
    const container = document.querySelector("#canvas-container");
    return container ? container.clientWidth : 800;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvasWidth = getCanvasWidth();
        const scale = canvasWidth / img.width;

        setImages((prev) => ({ ...prev, [img.src]: img }));

        setElements((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "image",
            src: img.src,
            x: 0,
            y: 0,
            width: canvasWidth,
            height: img.height * scale,
          },
        ]);

        e.target.value = null;
      };
    };
    reader.readAsDataURL(file);
  };

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleModalSelect = (item) => {
    // item may be { file } or { payload } or recent-item with payload
    const file = item?.file || item?.payload?.file || item?.payload || item;
    if (!file) return;

    // If item is already a data URL or src, handle directly
    if (typeof file === 'string' && (file.startsWith('data:') || file.startsWith('/api/media/') || file.startsWith('http'))) {
  const img = new window.Image();
  img.src = file;
  img.onload = () => {
    const canvasWidth = getCanvasWidth();
    const scale = canvasWidth / img.width;

    setImages((prev) => ({ ...prev, [img.src]: img }));

    setElements((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "image",
        src: img.src,
        x: 0,
        y: 0,
        width: canvasWidth,
        height: img.height * scale,
      },
    ]);
  };
  widgetValidation(2,2);
  return;
}

    // Validar que sea un Blob/File antes de usar FileReader
    if (!(file instanceof Blob)) {
      console.error('Error: El archivo seleccionado no es un Blob/File:', file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvasWidth = getCanvasWidth();
        const scale = canvasWidth / img.width;

        setImages((prev) => ({ ...prev, [img.src]: img }));

        setElements((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "image",
            src: img.src,
            x: 0,
            y: 0,
            width: canvasWidth,
            height: img.height * scale,
          },
        ]);

        widgetValidation(2,2);
      };
    };
    try {
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error reading selected media', err);
    }
  };

  const addPreloadedImage = (src) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const canvasWidth = getCanvasWidth();
      const scale = canvasWidth / img.width;

      setImages((prev) => ({ ...prev, [img.src]: img }));
      setElements((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "image",
          src: img.src,
          x: 0,
          y: 0,
          width: canvasWidth,
          height: img.height * scale,
        },
      ]);
    };
    widgetValidation(2,2)
  };

  const handleDragStart = (e, img) => {
    e.dataTransfer.setData("image-src", img.src);
  };

  const getImagesByType = () => {
    switch (imageType) {
      case "objects":
        return getObjectImages();
        case "background":
          return getBackgroundImages();
      case "users":
        return getPersonsImages();
      case "shape":
        return getShapesImages();
      default:
        return [];
    }
  };

  const loadedImages = getImagesByType();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
      <div className="mt-2">
        <button
          className="w-full text-left border p-2 rounded-lg bg-white hover:bg-gray-50"
          onClick={() => setShowUploadModal(true)}
        >
          Browse images (open media picker)
        </button>
      </div>

      <UploadMedia
        show={showUploadModal}
        allowedTypes={["image"]}
        onClose={() => setShowUploadModal(false)}
        onSelect={(f) => { handleModalSelect(f); setShowUploadModal(false); }}
        galleryType={imageType}
        type="image"
      />

      <h3 className="text-md font-semibold mt-6 mb-2 capitalize">
        Funread's {imageType}
      </h3>
      <div className="flex flex-col gap-4">
        {loadedImages.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.id}
            draggable
            onClick={() => addPreloadedImage(img.src)}
            onDragStart={(e) => handleDragStart(e, img)}
            className="w-full h-40 object-contain cursor-pointer border-2 border-gray-300 rounded-lg shadow bg-white hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
}
