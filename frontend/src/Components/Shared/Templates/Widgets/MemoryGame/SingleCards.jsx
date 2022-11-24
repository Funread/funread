import "./SingleCards.css"
import font from "../MemoryGame/img/MemoryFont.png"

export default function SingleCards({card, handleChoice, flipped, disabled}){
    const handleClick=()=>{
        if(disabled){
            handleChoice(card)
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped": ""}>
                <img className='front' src={card.src} alt="card front"></img>
                <img className='back' src={font} onClick={handleClick}alt="card back"></img>
            </div>
        </div>
    )
}