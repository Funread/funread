import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const QuizCompleteEditor = forwardRef(
  (
    {
      pageNumber = 1,
      type = "complete",
      initialData = null // ← puede ser null si es nuevo
    },
    ref
  ) => {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [points, setPoints] = useState(10);

    // Si recibimos datos de la BD, cargarlos
    useEffect(() => {
      if (initialData) {
        setTitle(initialData.title || "");
        setQuestion(initialData.question || "");
        setCorrectAnswer(initialData.correctAnswer || "");
        setPoints(initialData.points || 10);
      }
    }, [initialData]);

    // Permite a un componente padre obtener el JSON final
    useImperativeHandle(ref, () => ({
      getQuizJson: () => {
        if (!title || !question || !correctAnswer || !Number(points)) {
          alert("Please complete all fields in the quiz editor.");
          return null;
        }

        return {
          type: "complete",
          title,
          question,
          correctAnswer,
          points: Number(points),
        };
      },
    }));

    return (
      <div className="bg-white p-4 rounded shadow max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Create a Complete Quiz</h2>

        <label className="block mb-2 font-medium">Title:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Complete the sentence"
        />

        <label className="block mb-2 font-medium">Question:</label>
        <div className="mb-2 text-sm text-gray-600">
          Use _______ to indicate where the blank space should be
        </div>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., Hannah runs _______ than Olivia."
        />

        <label className="block mb-2 font-medium">Correct Answer:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="e.g., faster"
        />

        <label className="block mb-2 font-medium">Points:</label>
        <input
          type="number"
          min={1}
          className="w-24 p-2 border rounded mb-4"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />

        {/* Preview section */}
        {title && question && correctAnswer && (
          <div className="mt-6 p-4 bg-gray-50 rounded border">
            <h3 className="font-medium mb-2">Preview:</h3>
            <div className="text-sm">
              <div className="mb-2">
                <strong>Title:</strong> {title}
              </div>
              <div className="mb-2">
                <strong>Question:</strong> {question.replace('_______', '_____')}
              </div>
              <div className="mb-2">
                <strong>Correct Answer:</strong> {correctAnswer}
              </div>
              <div>
                <strong>Points:</strong> {points}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default QuizCompleteEditor; 