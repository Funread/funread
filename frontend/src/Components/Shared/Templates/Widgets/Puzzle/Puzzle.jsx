import React, { useState } from "react";
import "./Puzzle.sass";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
  
function Puzzle(props) {
    const [imagen, setPuzzle] = useState("https://picsum.photos/300/300?image=20");
    const [text, setText] = useState("Resuelve el rompecabezas!!");

    const set = () => {
        setText("Has Ganado!!");
    };
      
    return (
        <div className="puzzle-container">
            <h2 className="tag">{text}</h2>
            <JigsawPuzzle
                imageSrc={imagen}
                rows={3}
                columns={3}
                onSolved={set}
                className="jigsaw-puzzle"
            />
        </div>
    );
}

export default Puzzle