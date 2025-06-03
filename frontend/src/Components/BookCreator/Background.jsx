export default function Background({ setElements, setImages }) {
  const preloaded = [
    { id: "tree", src: "https://th.bing.com/th/id/OIP.O7hIz5AQJzc_ahFadWSztwHaEo?rs=1&pid=ImgDetMain" },
    { id: "house", src: "/images/house.png" },
    { id: "sun", src: "/images/sun.png" },
  ];

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

  const addPreloadedImage = (src) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const canvasWidth = getCanvasWidth();
      const scale = canvasWidth / img.width;

      setImages((prev) => ({ ...prev, [img.src]: img }));
      setElements((prev) => [
        {
          id: Date.now().toString(),
          type: "image",
          src: img.src,
          x: 0,
          y: 0,
          width: canvasWidth,
          height: img.height * scale,
        },
        ...prev
      ]);
    };
  };

  const handleDragStart = (e, img) => {
    e.dataTransfer.setData("image-src", img.src);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mt-4 w-full border p-2 rounded-lg cursor-pointer"
      />

      <h3 className="text-md font-semibold mt-6 mb-2">Imágenes precargadas</h3>
      <div className="flex flex-col gap-4">
        {preloaded.map((img) => (
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
