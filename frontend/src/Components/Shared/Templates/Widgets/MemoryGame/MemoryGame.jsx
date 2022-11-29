import React, {useState, useEffect} from 'react'
import { Image } from 'react-bootstrap';
import "./MemoryGame.css";
import logo1 from "../MemoryGame/img/MemoryImage1.png"
import logo2 from "../MemoryGame/img/MemoryImage2.png"
import logo3 from "../MemoryGame/img/MemoryImage3.png"
import logo4 from "../MemoryGame/img/MemoryImage4.png"
import logo5 from "../MemoryGame/img/MemoryImage5.png"
import logo6 from "../MemoryGame/img/MemoryImage6.png"
import font from "../MemoryGame/img/MemoryFont.png"
import SingleCards from "./SingleCards.jsx";

const memorycards=[
{"src": logo1, matched:false},
{"src": logo2, matched:false},
{"src": logo3, matched:false},
{"src": logo4, matched:false},
{"src": logo5, matched:false},
{"src": logo6, matched:false},
];

function MemoryGame(props) {

    const[cards, setCards]= useState([])

    const[turns, setTurns]= useState(0)

    const[choiceOne, setChoiceOne]= useState(null)
 
    const[choiceTwo, setChoiceTwo]= useState(null)

    const[disabled, setDisabled]= useState(false)

     const shuffleCards= () =>{
     const shuffledCards= [...memorycards, ...memorycards]
        .sort(()=>Math.random() - 0.5)
        .map((card)=>({...card, id: Math.random()}))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards (shuffledCards)
        setTurns (0)
     }

   const handleChoice= (card)=>{
    choiceOne ? setChoiceTwo(card): setChoiceOne(card)
   }
   useEffect(()=>{
    setDisabled(true)
    if(choiceOne&&choiceTwo){
      if(choiceOne.src===choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
          if(card.src===choiceOne.src){
            return{...card, matched: true}
          }else{return card}
        })
      })
        resetTurn()
      }else{
        setTimeout(()=>resetTurn(), 1000) 
      }
    }
   },[choiceOne, choiceTwo]
   )
  
   console.log(cards)

   const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns=>prevTurns+1)
    setDisabled(false)
   }

   useEffect(()=>{shuffleCards()},[])

  return (
    <div className="memorygame">
        <center><h1>Memory Game</h1></center>
        <center><button className="button" onClick={shuffleCards}>New Game</button></center>
       <div className='card-grid'>
        {cards.map(card=>(
          <SingleCards key={card.id}card={card}handleChoice={handleChoice}
          flipped={card===choiceOne||card===choiceTwo||card.matched}
          disabled={disabled}
          />
        ))}
       </div>
       <center><p>Turns: {turns}</p></center>
    </div>
  )
}

MemoryGame.propTypes = {}

export default MemoryGame
