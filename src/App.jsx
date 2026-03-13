import { useState, useRef, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from "nanoid"

function App() {

  function generateAllNewDice(){
    return new Array(10)
      .fill(0)
      .map(() => ({ 
        value : Math.floor(Math.random() * 6 + 1), 
        isHeld : false,
        id : nanoid()
      }))
  }

  const [dice, setDice] = useState(generateAllNewDice)
  const buttonRef = useRef(null)

  let gameWon = dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if(gameWon){
      buttonRef.current.focus()
    }
  },[gameWon])


  function rollDice(){
    if(!gameWon){
    setDice(prevDice => prevDice.map(die =>(
      die.isHeld ? die : {...die, value : Math.floor(Math.random() * 6 + 1)} 
      )
    ))}else{
    setDice(generateAllNewDice())
  }
  
  }

  function changeIsHeld(id){
    setDice(prevDice => prevDice.map(die => {
        return die.id === id ? 
        {...die, isHeld : !die.isHeld} : die
      })
    )
  }

  return(
    <main>
      <div aria-live="polite" className='sr-only'>
        {gameWon && <p>Congratulation! You won! If you want play again click on button.</p>}
      </div>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'> Roll until all dice are the same. Click each die to 'freeze' it at its 
        current value between rolls!
      </p>
      <div className = "dice-container">
        {dice.map((dieObj) =>(
          <Die 
          key={dieObj.id} 
          value = {dieObj.value} 
          isHeld={dieObj.isHeld} 
          changeIsHeld = {() => changeIsHeld(dieObj.id)}
          />
        ))}
      </div>   
      <button ref={buttonRef} onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
