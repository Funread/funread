import React, { useState } from "react";
import "./Puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import img from "./Image.png";
  
function Puzzle() {
    const [text, setText] = useState("Resuelve el rompecabezas");
      
    const set = () => {
        setText("Has Ganado!!");
    };
      
    return (
        <div className="puzzle-container">
            <h2 className="tag">{text}</h2>
            <JigsawPuzzle
                imageSrc={img}
                rows={3}
                columns={3}
                onSolved={set}
                className="jigsaw-puzzle"
            />
        </div>
    );
}

export default Puzzle