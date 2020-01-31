import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h1>React and Firebase Quiz App</h1>
      <Link to='/game' className='btn'>Start game</Link>
      <Link to='/highScores' className='btn'>High Scores</Link>
    </>
  )
}
