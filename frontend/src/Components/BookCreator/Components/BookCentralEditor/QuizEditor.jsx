import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./QuizEditor.css";

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
        const content = initialData.content || {};
        
        const cleanQuestion = content.question === "Escribe la pregunta aquí" ? "" : (content.question || "");
        const cleanTitle = content.title === "Nuevo Quiz" ? "" : (content.title || content.audio || content.video || "");
        
        setQuestion(cleanQuestion);
        setTitle(cleanTitle);

        const loadedOptions = initialData.options?.map((opt) => {
          const isDefaultOption = /^Option [123]$/.test(opt.answer);
          return isDefaultOption ? "" : opt.answer;
        });
        const hasValidOptions = Array.isArray(loadedOptions) && loadedOptions.length > 0;
        setOptions(hasValidOptions ? loadedOptions : Array(3).fill(""));

        const correctIdx = initialData.options?.findIndex((opt) => opt.isCorrect);
        setCorrectIndex(correctIdx >= 0 ? correctIdx : null);

        const correctPoints = initialData.options?.[correctIdx]?.points || 10;
        setScore(correctPoints);
      } else {
        setOptions(Array(3).fill(""));
      }
    }, [initialData]);

    useImperativeHandle(ref, () => ({
      getQuizJson: () => {
        const hasContent = title || question || options.some(opt => opt.trim() !== "");
        
        if (hasContent) {
          const isAnyEmpty = options.some((opt) => opt.trim() === "");
          if (!question || correctIndex === null || !Number(score) || isAnyEmpty) {
            alert("Please complete all fields in the quiz editor.");
            return null;
          }
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
            points: index === correctIndex ? Number(score) : 10,
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
          <div className="quiz-editor-field">
            <label className="quiz-editor-label">
              Title
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className="quiz-editor-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title..."
            />
          </div>
        );
      }

      if (type === "audioQuiz") {
        return (
          <div className="quiz-editor-field">
            <label className="quiz-editor-label">
              🎵 Audio URL
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className="quiz-editor-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="https://.../audio.mp3"
            />
          </div>
        );
      }

      if (type === "videoQuiz") {
        return (
          <div className="quiz-editor-field">
            <label className="quiz-editor-label">
              🎬 Video URL
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className="quiz-editor-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="https://.../video.mp4"
            />
          </div>
        );
      }

      return null;
    };

    return (
      <div className="quiz-editor-container">
        <div className="quiz-editor-header">
          <h2 className="quiz-editor-title">
            {type === "singleChoice" ? "Multiple Choice Quiz" : type === "audioQuiz" ? "Audio Quiz" : "Video Quiz"}
          </h2>
          <p className="quiz-editor-subtitle">
            Create engaging questions for your students
          </p>
        </div>

        <div className="quiz-editor-content">
          {renderTitleField()}

          <div className="quiz-editor-field">
            <label className="quiz-editor-label">
              Question
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className="quiz-editor-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
            />
          </div>

          <div className="quiz-editor-field">
            <label className="quiz-editor-label">
              Answer Options
              <span className="required-star">*</span>
            </label>
            <div className="quiz-options-list">
              {options.map((opt, index) => (
                <div key={index} className="quiz-option-item">
                  <div className="option-number">{index + 1}</div>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="quiz-option-input"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => setCorrectIndex(index)}
                    className={`quiz-correct-button ${correctIndex === index ? 'correct-selected' : ''}`}
                    title="Mark as correct answer"
                  >
                    {correctIndex === index ? '✓' : '○'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="quiz-editor-field">
            <label className="quiz-editor-label">
              Points
              <span className="required-star">*</span>
            </label>
            <input
              type="number"
              min={1}
              className="quiz-editor-input quiz-points-input"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default QuizEditor;
