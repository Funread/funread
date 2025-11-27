import React, { useState, useEffect } from 'react';
import './WordSearchPage.css';
import Lottie from "react-lottie";
// Importamos animaciones divertidas para niños
import happyAnimalAnimation from "../../../assets/animations/happy-animal.json";
import pencilDancingAnimation from "../../../assets/animations/pencil-dancing.json";
import colorfulBalloonAnimation from "../../../assets/animations/colorful-balloon.json";
import thumbsUpAnimation from "../../../assets/animations/thumbs-up-kid.json";

const WordSearchPage = ({ widgets, pageData }) => {
  const [gameState, setGameState] = useState({
    grid: [],
    foundWords: new Set(),
    timeLeft: 0,
    isGameOver: false,
    selectedCells: [],
    isDragging: false,
    foundPositions: new Set(),
    showCelebration: false,
    selectionDirection: null
  });

  const [config, setConfig] = useState(null);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [animationType, setAnimationType] = useState("animal");

  // Conjunto de animaciones divertidas para niños
  const animations = {
    animal: happyAnimalAnimation,
    pencil: pencilDancingAnimation,
    balloon: colorfulBalloonAnimation,
    thumbsUp: thumbsUpAnimation,
  };

  // Conjunto de mensajes divertidos
  const celebrationMessages = [
    "¡Excelente trabajo! 🌟",
    "¡Eres un campeón! 🏆",
    "¡Lo has logrado! 🎉",
    "¡Increíble! 🚀",
    "¡Perfecto! ⭐",
  ];

  // Configuración para las animaciones de Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animations[animationType],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    console.log('=== WordSearchPage useEffect ===');
    console.log('Received widgets:', JSON.stringify(widgets, null, 2));
    console.log('Widgets length:', widgets?.length);
    
    if (widgets && widgets.length > 0) {
      // Los widgets son los widgetitems de la página tipo 5 (games)
      // Tomar el primer widget directamente
      const wordSearchWidget = widgets[0];
      console.log('Word search widget (first):', JSON.stringify(wordSearchWidget, null, 2));
      console.log('Widget has value?', !!wordSearchWidget?.value);
      console.log('Widget value type:', typeof wordSearchWidget?.value);
      
      if (wordSearchWidget && wordSearchWidget.value) {
        let configData;
        try {
          configData = typeof wordSearchWidget.value === 'string' 
            ? JSON.parse(wordSearchWidget.value)
            : wordSearchWidget.value;
          
          console.log('Parsed config data:', JSON.stringify(configData, null, 2));
          console.log('Config has words?', !!configData?.words);
          console.log('Words length:', configData?.words?.length);
          
          // Verificar que tenga la estructura esperada
          if (configData && configData.words && configData.words.length > 0) {
            console.log('✅ Config is valid, setting up game');
            setConfig(configData);
            setGameState(prev => ({
              ...prev,
              timeLeft: configData.timeLimit || 300,
              grid: generateWordSearchGrid(configData)
            }));
          } else {
            console.error('❌ Config data missing words:', configData);
          }
        } catch (error) {
          console.error('❌ Error parsing word search config:', error);
        }
      } else {
        console.error('❌ No word search widget value found. Widget:', wordSearchWidget);
      }
    } else {
      console.error('❌ No widgets available. Widgets:', widgets);
    }
    console.log('=== End WordSearchPage useEffect ===');
  }, [widgets]);

  useEffect(() => {
    if (gameState.timeLeft > 0 && !gameState.isGameOver) {
      const timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(timer);
            return { ...prev, timeLeft: 0, isGameOver: true };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.timeLeft, gameState.isGameOver]);

  // Efecto para verificar si se encontraron todas las palabras
  useEffect(() => {
    if (config && gameState.foundWords.size === config.words.length) {
      // Elegir aleatoriamente una animación
      const animationTypes = Object.keys(animations);
      const randomAnimationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      setAnimationType(randomAnimationType);

      // Elegir aleatoriamente un mensaje de celebración
      const randomMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
      setCelebrationMessage(randomMessage);

      setGameState(prev => ({
        ...prev,
        showCelebration: true,
        isGameOver: true
      }));
    }
  }, [gameState.foundWords, config]);

  // Efecto para ocultar la animación después de 5 segundos
  useEffect(() => {
    if (gameState.showCelebration) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          showCelebration: false
        }));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [gameState.showCelebration]);

  const generateWordSearchGrid = (config) => {
    const { rows, columns } = config.gridSize;
    const words = config.words;
    
    // Initialize empty grid
    let grid = Array(rows).fill().map(() => Array(columns).fill(''));
    
    // Helper function to check if a word can be placed at a position
    const canPlaceWord = (word, row, col, direction) => {
      const dr = direction === 'down' ? 1 : 0;
      const dc = direction === 'right' ? 1 : 0;
      
      for (let i = 0; i < word.length; i++) {
        const newRow = row + (dr * i);
        const newCol = col + (dc * i);
        
        if (newRow >= rows || newCol >= columns) return false;
        if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) return false;
      }
      return true;
    };
    
    // Helper function to place a word
    const placeWord = (word, row, col, direction) => {
      const dr = direction === 'down' ? 1 : 0;
      const dc = direction === 'right' ? 1 : 0;
      
      for (let i = 0; i < word.length; i++) {
        const newRow = row + (dr * i);
        const newCol = col + (dc * i);
        grid[newRow][newCol] = word[i];
      }
    };
    
    // Place each word
    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 1000; // Límite de intentos para evitar bucle infinito
      
      while (!placed && attempts < maxAttempts) {
        attempts++;
        const direction = Math.random() < 0.5 ? 'right' : 'down';
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * columns);
        
        if (canPlaceWord(word, row, col, direction)) {
          placeWord(word, row, col, direction);
          placed = true;
        }
      }
      
      if (!placed) {
        console.warn(`No se pudo colocar la palabra "${word}" después de ${maxAttempts} intentos`);
      }
    });
    
    // Fill empty spaces with random letters
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
    
    return grid;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseDown = (row, col) => {
    setGameState(prev => ({
      ...prev,
      isDragging: true,
      selectedCells: [{ row, col }],
      selectionDirection: null
    }));
  };

  const handleMouseEnter = (row, col) => {
    if (!gameState.isDragging) return;

    const lastCell = gameState.selectedCells[gameState.selectedCells.length - 1];
    if (!lastCell) return;

    // Determinar la dirección de la selección
    let direction = gameState.selectionDirection;
    if (!direction) {
      if (row === lastCell.row) direction = 'right';
      else if (col === lastCell.col) direction = 'down';
      else return;
    }

    // Verificar que la nueva celda está en la misma línea
    if (direction === 'right' && row !== lastCell.row) return;
    if (direction === 'down' && col !== lastCell.col) return;

    // Verificar si estamos retrocediendo
    const isBacktracking = gameState.selectedCells.some(
      cell => cell.row === row && cell.col === col
    );

    if (isBacktracking) {
      setGameState(prev => ({
        ...prev,
        selectedCells: prev.selectedCells.slice(0, -1)
      }));
    } else {
      // Verificar que la nueva celda es adyacente
      const isAdjacent = 
        (direction === 'right' && Math.abs(col - lastCell.col) === 1) ||
        (direction === 'down' && Math.abs(row - lastCell.row) === 1);

      if (isAdjacent) {
        setGameState(prev => ({
          ...prev,
          selectedCells: [...prev.selectedCells, { row, col }],
          selectionDirection: direction
        }));
      }
    }
  };

  const handleMouseUp = () => {
    if (!gameState.isDragging) return;

    const selectedWord = gameState.selectedCells
      .map(cell => gameState.grid[cell.row][cell.col])
      .join('');

    const reversedWord = selectedWord.split('').reverse().join('');

    if (config.words.includes(selectedWord) || config.words.includes(reversedWord)) {
      const wordToAdd = config.words.includes(selectedWord) ? selectedWord : reversedWord;
      const positions = gameState.selectedCells.map(cell => `${cell.row},${cell.col}`);
      
      setGameState(prev => ({
        ...prev,
        foundWords: new Set([...prev.foundWords, wordToAdd]),
        foundPositions: new Set([...prev.foundPositions, ...positions]),
        selectedCells: [],
        isDragging: false,
        selectionDirection: null
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        selectedCells: [],
        isDragging: false,
        selectionDirection: null
      }));
    }
  };

  if (!config) {
    console.log('Config is null, showing loading state');
    return <div>Loading...</div>;
  }

  return (
    <div className="word-search-container">
      {/* Animación de celebración */}
      {gameState.showCelebration && (
        <div className="celebration-animation">
          <Lottie options={defaultOptions} height={400} width={400} />
          <div className="celebration-message">{celebrationMessage}</div>
        </div>
      )}

      <div className="word-search-header">
        <h2>{config.title}</h2>
        <div className="word-search-info">
          <span>Difficulty: {config.difficulty}</span>
          <span>Time: {formatTime(gameState.timeLeft)}</span>
          <span>Words: {gameState.foundWords.size} / {config.words.length}</span>
        </div>
      </div>

      <div className="word-search-content">
        <div 
          className="word-search-grid"
          onMouseLeave={() => setGameState(prev => ({ 
            ...prev, 
            isDragging: false, 
            selectedCells: [],
            selectionDirection: null
          }))}
        >
          {gameState.grid.map((row, i) => (
            <div key={i} className="word-search-row">
              {row.map((cell, j) => {
                const isSelected = gameState.selectedCells.some(
                  selected => selected.row === i && selected.col === j
                );
                const isFound = gameState.foundPositions.has(`${i},${j}`);
                return (
                  <div
                    key={`${i}-${j}`}
                    className={`word-search-cell ${isSelected ? 'selected' : ''} ${isFound ? 'found' : ''}`}
                    onMouseDown={() => handleMouseDown(i, j)}
                    onMouseEnter={() => handleMouseEnter(i, j)}
                    onMouseUp={handleMouseUp}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="word-search-words">
          <h3>Find these words:</h3>
          <ul>
            {config.words.map((word, index) => (
              <li 
                key={index}
                className={gameState.foundWords.has(word) ? 'found' : ''}
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {gameState.isGameOver && !gameState.showCelebration && (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>Words Found: {gameState.foundWords.size} / {config.words.length}</p>
        </div>
      )}
    </div>
  );
};

export default WordSearchPage; 