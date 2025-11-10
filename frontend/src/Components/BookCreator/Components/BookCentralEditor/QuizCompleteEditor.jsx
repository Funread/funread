import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./QuizCompleteEditor.css";

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
        console.log("Cargando datos iniciales:", initialData);
        const src = initialData.content ? initialData.content : initialData;
        
        const cleanTitle = (src.title || initialData.title || "") === "Nuevo Quiz" ? "" : (src.title || initialData.title || "");
        const cleanQuestion = (src.question || initialData.question || "") === "Escribe la pregunta aquí" ? "" : (src.question || initialData.question || "");
        const cleanCorrectAnswer = (src.correctAnswer || initialData.correctAnswer || "") === "answer" ? "" : (src.correctAnswer || initialData.correctAnswer || "");
        
        setTitle(cleanTitle);
        setQuestion(cleanQuestion);
        setCorrectAnswer(cleanCorrectAnswer);
        setPoints(src.points ?? initialData.points ?? 10);
      }
    }, [initialData]);

    useImperativeHandle(ref, () => ({
      getQuizJson: () => {
        const hasContent = title || question || correctAnswer;
        
        if (hasContent) {
          if (!title || !question || !correctAnswer) {
            alert("Please complete all fields in the quiz editor.");
            return null;
          }
        }

        return {
          type: "COMPLETE",
          content: {
            title,
            question,
            correctAnswer,
            points: Number(points),
          },
        };
      },
    }));

    return (
      <div className="quiz-complete-editor-container">
        <div className="quiz-complete-header">
          <h2 className="quiz-complete-title">
            Fill in the Blank Quiz
          </h2>
          <p className="quiz-complete-subtitle">
            Create a complete-the-sentence quiz for students
          </p>
        </div>

        <div className="quiz-complete-content">
          <div className="quiz-complete-field">
            <label className="quiz-complete-label">
              Title
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className="quiz-complete-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete the sentence"
            />
          </div>

          <div className="quiz-hint-box">
            <span className="hint-icon">💡</span>
            <span>Use <strong>_______</strong> (underscores) to indicate where the blank space should be</span>
          </div>

          <div className="quiz-complete-field">
            <label className="quiz-complete-label">
              Question
              <span className="required-star">*</span>
            </label>
            <textarea
              rows={3}
              className="quiz-complete-textarea"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Hannah runs _______ than Olivia."
            />
          </div>

          <div className="quiz-complete-field">
            <label className="quiz-complete-label">
              Correct Answer
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className="quiz-complete-input"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="e.g., faster"
            />
          </div>

          <div className="quiz-complete-field">
            <label className="quiz-complete-label">
              Points
              <span className="required-star">*</span>
            </label>
            <input
              type="number"
              min={1}
              className="quiz-complete-input quiz-points-input"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>

        {/* Preview section */}
        {title && question && correctAnswer && (
          <div className="quiz-complete-preview">
            <div className="preview-header">
              👁️ Preview
            </div>
            <div className="preview-card">
              <div className="preview-title-text">{title}</div>
              <div className="preview-question-interactive">
                {question.split('_______').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span className="preview-blank-space">____</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="preview-answer-section">
                <span className="preview-answer-label">Correct Answer:</span>
                <span className="preview-answer-value">{correctAnswer}</span>
              </div>
              <div className="preview-points-badge">
                🏆 {points} points
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default QuizCompleteEditor;