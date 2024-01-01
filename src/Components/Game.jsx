import { useState, useEffect, useRef } from 'react'
import '../CSS/Game.css'
import Cursor from './Cursor'
import mole from '../assets/mole.png'
import moleWhacked from '../assets/mole-whacked.png'

export default function Game(props) {
  const [score, setScore] = useState(0)
  const [moles, setMoles] = useState(new Array(11).fill(false))
  const [whackedMoleIndex, setWhackedMoleIndex] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const initialTimeRef = useRef(props.timer)

  const setMoleVisibility = (i, isVisible) => {
    setMoles((currentMoles) => {
      const newMoles = [...currentMoles]
      newMoles[i] = isVisible
      return newMoles
    })
  }

  const whackMole = (i) => {
    setMoleVisibility(i, false)
    if (moles[i]) {
      setScore(prevState => prevState + 10)
      setWhackedMoleIndex(i)
    }
  }

  useEffect(() => {
    let lastRandomIndex = -1
    const intervalPeriod = props.difficulty === 1 ? 2000 : props.difficulty === 2 ? 1500 : 700
    const timeoutPeriod = props.difficulty === 1 ? 2000 : props.difficulty === 2 ? 750 : 500
    const moleInterval = setInterval (() => {
      let randomIndex

      do {
        randomIndex = Math.floor(Math.random() * moles.length)
      } while (randomIndex === lastRandomIndex)
      lastRandomIndex = randomIndex
      setMoleVisibility(randomIndex, true)
      setTimeout(() => {
        setMoleVisibility(randomIndex, false)
        setWhackedMoleIndex(null)
      }, intervalPeriod)
    }, timeoutPeriod)

    const gameTimeout = setTimeout(() => {
      clearInterval(moleInterval)
      setMoles(new Array(11).fill(false))
    }, props.timer * 1000)

    return () => {
      clearInterval(moleInterval)
      clearTimeout(gameTimeout)
    }
    // eslint-disable-next-line
  }, [showPopup])

  useEffect(() => {
    const timerInterval = setInterval(() => {
      props.setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    const gameTimeout = setTimeout(() => {
      clearInterval(timerInterval)
      setShowPopup(true)
    }, props.timer * 1000)

    return () => {
      clearInterval(timerInterval)
      clearTimeout(gameTimeout)
    }
    // eslint-disable-next-line
  }, [props.timer])

  const restartGame = () => {
    setScore(0)
    setMoles(new Array(11).fill(false))
    setWhackedMoleIndex(null)
    setShowPopup(false)
    props.setTimer(initialTimeRef.current)
  }

  const resetGame = () => {
    restartGame()
    props.setGame(false)
  }
 
  return(
    <div className='game'>
      <div className='game-text'>
        <p>Score: {score}</p>
        <p>Time: {props.timer}s</p>
      </div>

      <div className='board'>
        {moles.map((isMole, i) => (
          <div
            key={i}
            className={`hole hole${i + 1}`}
          >
            {(isMole || whackedMoleIndex === i) &&
              <img 
                draggable='false'
                onClick={() => whackMole(i)}
                className='mole' src={whackedMoleIndex === i ? moleWhacked : mole}
                alt='mole'
              />
            }
          </div>
        ))}
        
        {props.timer !== 0 && <Cursor />}
      </div>

      {showPopup && (
        <>
          <div className="overlay" />

          <div className="popup">
            <p>Your Score: {score}</p>
            <div className='buttons-container'>
              <button onClick={restartGame}>Restart Game</button>
              <button onClick={resetGame}>Back to Title Screen</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}