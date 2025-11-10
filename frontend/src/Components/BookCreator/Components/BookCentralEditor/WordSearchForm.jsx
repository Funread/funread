import React, { useState, useEffect } from 'react';
import './WordSearchForm.css';

const DEFAULT_FORM_DATA = {
  title: "Word Search Puzzle",
  difficulty: "Medium",
  timeLimit: 300,
  gridSize: {
    rows: 10,
    columns: 10
  },
  words: [""]
};

export default function WordSearchForm({ onSave, initialData = null }) {
  const [formData, setFormData] = useState(() => initialData ? ({
    title: initialData.title ?? initialData.title ?? DEFAULT_FORM_DATA.title,
    difficulty: initialData.difficulty ?? DEFAULT_FORM_DATA.difficulty,
    timeLimit: initialData.timeLimit ?? DEFAULT_FORM_DATA.timeLimit,
    gridSize: initialData.gridSize ?? DEFAULT_FORM_DATA.gridSize,
    words: initialData.words ?? DEFAULT_FORM_DATA.words,
  }) : DEFAULT_FORM_DATA);

  // Update when initialData changes (e.g., page load)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title ?? DEFAULT_FORM_DATA.title,
        difficulty: initialData.difficulty ?? DEFAULT_FORM_DATA.difficulty,
        timeLimit: initialData.timeLimit ?? DEFAULT_FORM_DATA.timeLimit,
        gridSize: initialData.gridSize ?? DEFAULT_FORM_DATA.gridSize,
        words: initialData.words ?? DEFAULT_FORM_DATA.words,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('gridSize.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        gridSize: {
          ...prev.gridSize,
          [field]: parseInt(value) || 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleWordChange = (index, value) => {
    const newWords = [...formData.words];
    newWords[index] = value.toUpperCase();
    setFormData(prev => ({
      ...prev,
      words: newWords
    }));
  };

  const addWord = () => {
    if (formData.words.length < 10) {
      setFormData(prev => ({
        ...prev,
        words: [...prev.words, ""]
      }));
    }
  };

  const removeWord = (index) => {
    if (formData.words.length > 1) {
      const newWords = formData.words.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        words: newWords
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.words.some(word => !word.trim())) {
      alert("Please complete all words");
      return;
    }

    if (formData.words.length < 3) {
      alert("You must enter at least 3 words");
      return;
    }

    if (formData.gridSize.rows < 5 || formData.gridSize.columns < 5) {
      alert("The minimum grid size is 5x5");
      return;
    }

    if (formData.gridSize.rows > 15 || formData.gridSize.columns > 15) {
      alert("The maximum grid size is 15x15");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="word-search-editor-container">
      <div className="word-search-editor-header">
        <h2 className="word-search-editor-title">
          Word Search Puzzle
        </h2>
        <p className="word-search-editor-subtitle">
          Create an engaging word search game for students
        </p>
      </div>

      <form onSubmit={handleSubmit} className="word-search-editor-content">
        <div className="word-search-editor-field">
          <label className="word-search-editor-label">
            Title
            <span className="required-star">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="word-search-editor-input"
            placeholder="Enter puzzle title"
            required
          />
        </div>

        <div className="word-search-editor-field">
          <label className="word-search-editor-label">
            Difficulty
            <span className="required-star">*</span>
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="word-search-editor-select"
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="word-search-editor-field">
          <label className="word-search-editor-label">
            Time limit (seconds)
            <span className="required-star">*</span>
          </label>
          <input
            type="number"
            name="timeLimit"
            min="60"
            max="600"
            value={formData.timeLimit}
            onChange={handleInputChange}
            className="word-search-editor-input word-search-time-input"
            required
          />
        </div>

        <div className="word-search-editor-field">
          <label className="word-search-editor-label">
            Grid size
            <span className="required-star">*</span>
          </label>
          <div className="word-search-grid-inputs">
            <input
              type="number"
              name="gridSize.rows"
              min="5"
              max="15"
              value={formData.gridSize.rows}
              onChange={handleInputChange}
              className="word-search-editor-input word-search-grid-input"
              required
            />
            <span className="word-search-grid-separator">x</span>
            <input
              type="number"
              name="gridSize.columns"
              min="5"
              max="15"
              value={formData.gridSize.columns}
              onChange={handleInputChange}
              className="word-search-editor-input word-search-grid-input"
              required
            />
          </div>
        </div>

        <div className="word-search-editor-field">
          <label className="word-search-editor-label">
            Words
            <span className="required-star">*</span>
          </label>
          <div className="word-search-words-list">
            {formData.words.map((word, index) => (
              <div key={index} className="word-search-word-row">
                <input
                  type="text"
                  value={word}
                  onChange={(e) => handleWordChange(index, e.target.value)}
                  placeholder={`Word ${index + 1}`}
                  className="word-search-editor-input"
                  required
                />
                {formData.words.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWord(index)}
                    className="word-search-remove-btn"
                    title="Remove word"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {formData.words.length < 10 && (
              <button
                type="button"
                onClick={addWord}
                className="word-search-add-btn"
              >
                + Add word
              </button>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="word-search-save-btn"
        >
          Save configuration
        </button>
      </form>
    </div>
  );
}