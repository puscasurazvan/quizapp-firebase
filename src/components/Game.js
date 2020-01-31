import React, { useState, useEffect, useCallback } from 'react'
import Question from './Question'
import SaveScoreForm from './SaveScoreForm'
import HUD from './HUD'
import { loadQuestions } from '../helpers/QuestionsHelper'

export default function Game({ history }) {

  const [questions, setQuestions ] = useState([])
  const [currentQuestion, setCurrentQuestion ] = useState(null)
  const [loading, setLoading ] = useState(true)
  const [score, setScore ] = useState(0)
  const [questionNumber, setQuestionNumber ] = useState(0)
  const [done, setDone ] = useState(false)

  const scoreSaved = () => {
    history.push('/')
  }

  useEffect(() => {
    loadQuestions()
      .then(question => setQuestions(questions))
      .catch( error => console.error(error))
  },[questions])

  const changeQuestion = useCallback((bonusPoints = 0) => {
    if(questions.length === 0) {
      setDone(true)
      return setScore(score + bonusPoints)
    }

    /** random index */
    const randomQuestionIndex = Math.floor(Math.random() * questions.length)
    /** current question = question at the random index */
    const currentQuestion = questions[randomQuestionIndex]
    /** remove the question from the question going forward */
    const remainingQuestions = [...questions]
    remainingQuestions.splice(randomQuestionIndex, 1)
    /** update state */
    setQuestions(remainingQuestions)
    setCurrentQuestion(currentQuestion)
    setLoading(false)
    setScore(score + bonusPoints)
    setQuestionNumber(questionNumber + 1)
  }, [
      score, 
      questionNumber, 
      questions, 
      setQuestions, 
      setLoading, 
      setCurrentQuestion,
      setQuestionNumber
    ])

  useEffect(() => {
    if(!currentQuestion && questions.length) {
      changeQuestion()
    }
  }, [changeQuestion, currentQuestion, questions.length])

  return (
    <>
      {loading && !done && <div id="loader"/>}
      {!done
        && !loading 
        && currentQuestion 
        && (<div>
              <HUD score={score} questionNumber={questionNumber} />
              <Question
              question={currentQuestion}
              changeQuestion={changeQuestion}
              />
            </div>
        )}
        {done && <SaveScoreForm score={score} scoreSaved={scoreSaved}/>}
        
    </>
  )
}
