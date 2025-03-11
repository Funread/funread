export default function ImagePanel({ setElements, setImages }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      
      img.onload = () => {
        setImages((prev) => ({ ...prev, [img.src]: img }));

        setElements((prev) => [...prev, {
          id: Date.now().toString(),
          type: "image",
          src: img.src,
          x: 50,
          y: 50,
          width: img.width / 4,
          height: img.height / 4,
        }]);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} className="mt-4 w-full border p-2 rounded-lg cursor-pointer" />
    </div>
  );
}
