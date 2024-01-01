import React from 'react'
import '../CSS/Start.css'

export default function Start(props) {
  const renderDifficultyButton = (level, label) => (
    <button
      className={props.difficulty === level ? 'clicked' : ''}
      onClick={() => props.setDifficulty(level)}
    >
      {label}
    </button>
  )

  return (
    <div className='start-container'>
      <p>Whack A Mole!</p>

      <div className='difficulty-container'>
        {renderDifficultyButton(1, 'Easy')}
        {renderDifficultyButton(2, 'Normal')}
        {renderDifficultyButton(3, 'Hard')}
      </div>

      <div className='select'>
        <label htmlFor="timerSelect">Time:</label>
        <select id="timerSelect" value={props.timer} onChange={(e) => props.setTimer(parseInt(e.target.value, 10))}>
          <option value={60}>1 minute</option>
          <option value={120}>2 minutes</option>
          <option value={180}>3 minutes</option>
          <option value={240}>4 minutes</option>
          <option value={300}>5 minutes</option>
          <option value={1800}>60 minutes</option>
        </select>
      </div>

      <button
        disabled={!props.difficulty}
        className='start-button'
        onClick={() => props.setGame(true)}
      >
        Start Game
      </button>
    </div>
  )
}