import React, { useState, useRef, useEffect } from "react";


export default function Canvas({
  rowsColumns,
  startGame,
  wordsToSearch,
}) {
  let auxRow, auxColumn;
  const abcd = "abcdefghijklmnopqrstuvwxyzç";
  const rows = rowsColumns,
    columns = rowsColumns;

  const canvasRef = useRef();
  let lettersClicked = [];
  let wordChecker = [];
  const [x, setX] = useState(0);

  const [alreadyAppearedBlankImg, setAlreadyAppearedBlankImg] = useState(0);

  useEffect(() => {
    if (x === 1) {
      createCanvas();
      setAlreadyAppearedBlankImg(1);
    }
    setX((prevX) => prevX + 1);
  }, [startGame, wordsToSearch]);

  const onDragStart = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData("text");
    lettersClicked.push(letter);
    wordChecker = lettersClicked.join("");

    if (lettersClicked.length === wordChecker.length) {
      const wordIndex = wordsToSearch.indexOf(wordChecker);
      if (wordIndex !== -1) {
        lettersClicked.forEach((letter) => {
          const cell = document.getElementById(letter);
          if (cell) {
            cell.classList.add("completed");
          }
        });
        lettersClicked = [];
        wordChecker = "";
      }
    }
  };

  const createCanvas = () => {
    let canvas = canvasRef.current;
    canvas.innerHTML = "";

    // ... Generación del tablero de letras

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (canvasRef.current) {
          let cell = document.createElement("div");
          cell.className = "cell";
          cell.id = `cell-${i}-${j}`;
          cell.setAttribute("draggable", "false");
          canvasRef.current.appendChild(cell);
        }
      }
    }
  };

  return (
    <div className="canvas" ref={canvasRef} onDragOver={onDragOver} onDrop={onDrop}>
      {!startGame && !alreadyAppearedBlankImg ? (
        <img alt="" width="560.017px" height="459px" />
      ) : null}
      {startGame && wordsToSearch.length > 0 && (
        <div>
          <h3>Palabras a buscar:</h3>
          <ul>
            {wordsToSearch.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
