export default function Background({ setElements, setImages }) {
  const preloaded = [
    { id: "arenal", src: "/imagenes/Background/Arenal.png" },
    { id: "aula", src: "/imagenes/Background/Aula.png" },
    { id: "aula2", src: "/imagenes/Background/Aula2.png" },
    { id: "barrio", src: "/imagenes/Background/Barrio.png" },
    { id: "cancha", src: "/imagenes/Background/Cancha.png" },
    { id: "circo", src: "/imagenes/Background/Circo.png" },
    { id: "guanacaste", src: "/imagenes/Background/Guanacaste.png" },
    { id: "nature_home", src: "/imagenes/Background/Nature_Home.jpg" },
    { id: "nature_home2", src: "/imagenes/Background/Nature_Home2.jpg" },
    { id: "park", src: "/imagenes/Background/Park.png" },
    { id: "river", src: "/imagenes/Background/River.jpg" },
    { id: "tree", src: "/imagenes/Background/Tree.jpg" },
    { id: "volcano", src: "/imagenes/Background/Volcano.jpg" },
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
          ...(Array.isArray(prev) ? prev : []),
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
        ...(Array.isArray(prev) ? prev : [])
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
