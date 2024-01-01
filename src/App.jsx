import { useState } from 'react'
import './CSS/App.css'
import Start from './Components/Start'
import Game from './Components/Game'

export default function App() {
  const [game, setGame] = useState(false)
  const [timer, setTimer] = useState(60)
  const [difficulty, setDifficulty] = useState(0)

  const cursorStyles = {
    cursor: game && timer ? 'none' : 'auto'
  }
  
  return (
    <div className='app' style={cursorStyles}>
    {(!game)
    ?
      <Start 
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        setGame={setGame} 
        timer={timer}
        setTimer={setTimer}
      />
    :
      <Game 
        difficulty={difficulty}
        timer={timer}
        setTimer={setTimer}
        setGame={setGame}
      />
    }
    </div>
  )
}
