// QuizEditor.jsx
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const QuizEditor = forwardRef(({ numOptions = 3, pageNumber = 1, type = "singleChoice" }, ref) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [score, setScore] = useState(10);

  useEffect(() => {
    setOptions(Array(numOptions).fill(""));
  }, [numOptions]);

  useImperativeHandle(ref, () => ({
    getQuizJson: () => {
      const isAnyEmpty = options.some((opt) => opt.trim() === "");
      if (!title || !question || correctIndex === null || !Number(score) || isAnyEmpty) {
        alert("Please complete all fields in the quiz editor.");
        return null;
      }

      return {
        pageNumber,
        type,
        content: {
          title,
          question,
        },
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

  return (
    <div className="bg-white p-4 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create a Single Choice Quiz</h2>

      <label className="block mb-2 font-medium">Title:</label>
      <input type="text" className="w-full p-2 border rounded mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label className="block mb-2 font-medium">Question:</label>
      <input type="text" className="w-full p-2 border rounded mb-4" value={question} onChange={(e) => setQuestion(e.target.value)} />

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
              correctIndex === index ? "bg-green-500 text-white" : "border border-gray-300 text-gray-600"
            }`}
          >
            {correctIndex === index ? "✓ Correct" : "Mark Correct"}
          </button>
        </div>
      ))}

      <label className="block mb-2 font-medium mt-2">Points:</label>
      <input type="number" min={1} className="w-24 p-2 border rounded mb-4" value={score} onChange={(e) => setScore(e.target.value)} />
    </div>
  );
});

export default QuizEditor;
