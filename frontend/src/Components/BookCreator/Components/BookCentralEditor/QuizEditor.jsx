import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const QuizEditor = forwardRef(
  (
    {
      pageNumber = 1,
      type = "singleChoice", // "audioQuiz" | "videoQuiz" | "singleChoice"
      initialData = null
    },
    ref
  ) => {
    const [title, setTitle] = useState(""); // Puede ser título, audio o video según el tipo
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [correctIndex, setCorrectIndex] = useState(null);
    const [score, setScore] = useState(10);

    // Cargar datos desde el backend o inicializar 3 opciones vacías
    useEffect(() => {
      if (initialData) {
        console.log('initialData')
         console.log(initialData)
        const content = initialData.content || {};
        setQuestion(content.question || "");
        setTitle(content.title || content.audio || content.video || "");

        const loadedOptions = initialData.options?.map((opt) => opt.answer);
        const hasValidOptions = Array.isArray(loadedOptions) && loadedOptions.length > 0;
        setOptions(hasValidOptions ? loadedOptions : Array(3).fill(""));

        const correctIdx = initialData.options?.findIndex((opt) => opt.isCorrect);
        setCorrectIndex(correctIdx >= 0 ? correctIdx : null);

        const correctPoints = initialData.options?.[correctIdx]?.points || 10;
        setScore(correctPoints);
      } else {
        // fallback por si no hay datos iniciales
        setOptions(Array(3).fill(""));
      }
    }, [initialData]);

    useImperativeHandle(ref, () => ({
      getQuizJson: () => {
        const isAnyEmpty = options.some((opt) => opt.trim() === "");
        if (!question || correctIndex === null || !Number(score) || isAnyEmpty) {
          alert("Please complete all fields in the quiz editor.");
          return null;
        }

        const content = { question };
        if (type === "singleChoice") content.title = title;
        if (type === "audioQuiz") content.audio = title;
        if (type === "videoQuiz") content.video = title;

        return {
          pageNumber,
          type,
          content,
          options: options.map((opt, index) => ({
            answer: opt,
            isCorrect: index === correctIndex,
            points: index === correctIndex ? Number(score) : 0,
            isActive: true,
          })),
        };
      },
    }));

    const handleOptionChange = (index, value) => {
      const updated = [...options];
      updated[index] = value;
      setOptions(updated);
    };

    const renderTitleField = () => {
      if (type === "singleChoice") {
        return (
          <>
            <label className="block mb-2 font-medium">Title:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        );
      }

      if (type === "audioQuiz") {
        return (
          <>
            <label className="block mb-2 font-medium">Audio URL:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="https://.../audio.mp3"
            />
          </>
        );
      }

      if (type === "videoQuiz") {
        return (
          <>
            <label className="block mb-2 font-medium">Video URL:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="https://.../video.mp4"
            />
          </>
        );
      }

      return null;
    };

    return (
      <div className="bg-white p-4 rounded shadow max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Create a {type === "singleChoice" ? "Single Choice" : type === "audioQuiz" ? "Audio" : "Video"} Quiz
        </h2>

        {renderTitleField()}

        <label className="block mb-2 font-medium">Question:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label className="block mb-2 font-medium">Options:</label>
        {options.map((opt, index) => (
          <div key={index} className="flex items-center mb-2 gap-2">
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => setCorrectIndex(index)}
              className={`px-3 py-1 text-sm rounded ${
                correctIndex === index
                  ? "bg-green-500 text-white"
                  : "border border-gray-300 text-gray-600"
              }`}
            >
              {correctIndex === index ? "✓ Correct" : "Mark Correct"}
            </button>
          </div>
        ))}

        <label className="block mb-2 font-medium mt-2">Points:</label>
        <input
          type="number"
          min={1}
          className="w-24 p-2 border rounded mb-4"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>
    );
  }
);

export default QuizEditor;
