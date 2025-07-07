export default function Quiz({ widgetValidation, changeQuizType }) {
  const preloaded = [
    { id: "AudioQuiz", src: "/book/AudioQuiz.png" },
    { id: "VideoQuiz", src: "/book/VideoQuiz.png" },
    { id: "SingleChoise", src: "/book/SingleChoise.png" },
    { id: "CompleteQuiz", src: "/book/CompleteQuiz.png" },
  ];

  const handleAddQuiz = (widgetId) => {
    // Establecer el tipo de quiz primero
    if (widgetId === "CompleteQuiz") {
      changeQuizType("complete");
    } else {
      changeQuizType("singleChoice");
    }
    
    // Luego cambiar el tipo de página
    widgetValidation(4, 4);
  };

  return (
    <div>
      <h3 className="text-md font-semibold mt-6 mb-2">Quiz & Test</h3>
      <div className="flex flex-col gap-4">
        {preloaded.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.id}
            draggable
            onClick={() => handleAddQuiz(img.id)}
            className="w-full h-40 object-contain cursor-pointer border-2 border-gray-300 rounded-lg shadow bg-white hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
}
