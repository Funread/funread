import React, { useState } from 'react';
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

export default function WordSearchForm({ onSave }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

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
    <div className="word-search-form">
      <h2 className="form-title">Create Word Search Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Difficulty:</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Time limit (seconds):</label>
          <input
            type="number"
            name="timeLimit"
            min="60"
            max="600"
            value={formData.timeLimit}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Grid size:</label>
          <div className="grid-size-inputs">
            <input
              type="number"
              name="gridSize.rows"
              min="5"
              max="15"
              value={formData.gridSize.rows}
              onChange={handleInputChange}
              required
            />
            <span>x</span>
            <input
              type="number"
              name="gridSize.columns"
              min="5"
              max="15"
              value={formData.gridSize.columns}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Words:</label>
          <div className="words-list">
            {formData.words.map((word, index) => (
              <div key={index} className="word-input">
                <input
                  type="text"
                  value={word}
                  onChange={(e) => handleWordChange(index, e.target.value)}
                  placeholder="Enter a word"
                  required
                />
                {formData.words.length > 1 && (
                  <button
                    type="button"
                    className="remove-word"
                    onClick={() => removeWord(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {formData.words.length < 10 && (
              <button
                type="button"
                className="add-word"
                onClick={addWord}
              >
                + Add word
              </button>
            )}
          </div>
        </div>

        <button type="submit" className="save-button">
          Save configuration
        </button>
      </form>
    </div>
  );
} 