import { useState } from 'react';
import { getShapesImages, getObjectImages, getPersonsImages, getBackgroundImages } from "../../../../api/images";
import UploadMedia from '../../UploadMedia/uploadMedia';

// Map sidebar imageType strings to galleryType numbers
const imageTypeToGalleryType = (imageType) => {
  const mapping = {
    'custom': 1,      // Custom IMG
    'background': 2,  // Background
    'shape': 3,       // Shapes
    'users': 4,       // Characters
    'objects': 5,     // Objects
  };
  return mapping[imageType] || 1; // Default to Custom if not found
};

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
    // Otherwise assume it's a File object — read as DataURL
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
      case "custom":
        return []; // Custom images come from user uploads only
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
    <div className="pb-24">
      <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
      <div className="mt-2">
        <button
          className="w-full flex items-center gap-2 border-2 border-blue-500 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onClick={() => setShowUploadModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16V4a2 2 0 012-2h12a2 2 0 012 2v12M4 16l4-4a2 2 0 012.828 0l2.344 2.344a2 2 0 002.828 0L20 8M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
          Upload or search images
        </button>
      </div>

      <UploadMedia
        show={showUploadModal}
        allowedTypes={["image"]}
        onClose={() => setShowUploadModal(false)}
        onSelect={(f) => { handleModalSelect(f); setShowUploadModal(false); }}
        galleryType={imageTypeToGalleryType(imageType)}
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
