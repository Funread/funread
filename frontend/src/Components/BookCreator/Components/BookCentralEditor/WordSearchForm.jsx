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
    <div className="bg-white p-4 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create a Word Search Game</h2>

      <label className="block mb-2 font-medium">Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-medium">Difficulty:</label>
      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-4"
        required
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <label className="block mb-2 font-medium">Time limit (seconds):</label>
      <input
        type="number"
        name="timeLimit"
        min="60"
        max="600"
        value={formData.timeLimit}
        onChange={handleInputChange}
        className="w-24 p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-medium">Grid size:</label>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          name="gridSize.rows"
          min="5"
          max="15"
          value={formData.gridSize.rows}
          onChange={handleInputChange}
          className="w-20 p-2 border rounded"
          required
        />
        <span className="text-gray-600 font-medium">x</span>
        <input
          type="number"
          name="gridSize.columns"
          min="5"
          max="15"
          value={formData.gridSize.columns}
          onChange={handleInputChange}
          className="w-20 p-2 border rounded"
          required
        />
      </div>

      <label className="block mb-2 font-medium">Words:</label>
      <div className="space-y-2 mb-4">
        {formData.words.map((word, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={word}
              onChange={(e) => handleWordChange(index, e.target.value)}
              placeholder="Enter a word"
              className="flex-1 p-2 border rounded"
              required
            />
            {formData.words.length > 1 && (
              <button
                type="button"
                onClick={() => removeWord(index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            + Add word
          </button>
        )}
      </div>

      <button 
        type="submit" 
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors font-medium"
      >
        Save configuration
      </button>
    </div>
  );
} 