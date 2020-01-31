import React, {useState} from 'react'
import { Link } from 'react-router-dom'


export default function SaveScoreForm({score}) {
  const [username, setUsername] = useState('')

  const onUsernameChange = (event) => {
    const updatedUsername = event.target.value
    setUsername(updatedUsername)
  }

  const saveHighScore = (event) => {
    event.preventDefault()
    const record = {
      name: username,
      score,
    }
    console.log(record)
  }

  return (
    <div className='container'>
      <h1>Score: {score} </h1>
      <form onSubmit={saveHighScore}>
        <input type="text" name="username" id="username" placeholder="Username" value={username} onChange={onUsernameChange}/>
        <button type="submit" className='btn' disabled={!username}>Save</button>
      </form>
      <Link to='/' className='btn'> Home </Link>
    </div>
  )
}
