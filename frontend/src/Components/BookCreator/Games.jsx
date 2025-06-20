export default function Games({ widgetValidation, setElements, setImages }) {
  const preloaded = [
    { id: "wordsearch", src: "/book/wordsearch.png" },  
  ]; 
  
  const handleAddGame = (widgetId) => {
    if (widgetId === "wordsearch") {
      // Solo cambiar el tipo de página a 5 (WordSearch)
      widgetValidation(9, 5);
      
      // No establecer elementos iniciales
      setElements(null);
    }
  };
  
  return (
    <div>
      <h3 className="text-md font-semibold mt-6 mb-2">Games</h3>
      <div className="flex flex-col gap-4">
        {preloaded.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.id}
            draggable
            onClick={() => handleAddGame(img.id)}
            className="w-full h-40 object-contain cursor-pointer border-2 border-gray-300 rounded-lg shadow bg-white hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
}
  