import React, { useState, useEffect } from 'react'
import { useFirebase } from '../data/FirebaseContext'
import { Link } from 'react-router-dom'

const HighScores = () => {
  const firebase = useFirebase()
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    firebase.scores().once('value', (snapshot) => {
      const data = snapshot.val()
      const sortedScores = formatScoreData(data)
      setScores(sortedScores)
      setLoading(false)
    })
  }, [firebase])

  const formatScoreData = (firebaseScores) => {
    const scores = []
    for(let key in firebaseScores) {
      const value = firebaseScores[key]
      value['key'] = key
      scores.push(value)
    }
    return scores
      .sort((score1, score2) => score2.score - score1.score)
      .slice(0,10)
  }

  return (
    <>
      {loading && <div id='loader'></div>}
      {!loading &&
        <>
          <h1>High Scores</h1>
          <div id="highScoresList">
            {scores.map((record) => (
              <li key={record.key} className='high-score'>
                {record.name} - {record.score}
              </li>
            ))}
          </div>
          <Link to='/' className='btn'> Home </Link>
        </>
      }
    </>
  )
}

export default HighScores
