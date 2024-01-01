import { useState, useEffect } from 'react'

export default function Cursor() {
  const [position, setPosition] = useState({ 
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseClick = () => {
      setActive(prevState => !prevState)
    }

    window.addEventListener('mousemove', updateCursorPosition)
    window.addEventListener('mousedown', handleMouseClick)
    window.addEventListener('mouseup', handleMouseClick)

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
      window.removeEventListener('mousedown', handleMouseClick)
      window.removeEventListener('mouseup', handleMouseClick)
    }
  }, [])

  return(
    <div 
      className={`custom-cursor ${active ? 'active' : ''}`} 
      style={{ left: position.x + 10, top: position.y + 10 }}
    >
    </div>
  )
}