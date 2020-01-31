import React, { Component } from 'react'
import Question from './Question'
import HUD from './HUD'
import { loadQuestions } from '../helpers/QuestionsHelper'

export default class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      /** Number of questions */
      questions: null,
      /** Current question number */
      currentQuestion: null,
      /** Loading state */
      loading: true,
      /** Score number */
      score: 0,
      /** Question number */
      questionNumber: 0,
      /** Whether the user has finished or not */
      done: false,
    }
  }

  async componentDidMount() {
    try {
      const questions = await loadQuestions()
      this.setState({
        questions,
        },
        () => {
          this.changeQuestion()
        }
      )
    }
    catch (error) {
      console.error(error)
    }
  }

  changeQuestion = (bonusPoints = 0) => {
    if(this.state.questions.length === 0) {
      return this.setState({done: true})
    }

    /** random index */
    const randomQuestionIndex = Math.floor(Math.random() * this.state.questions.length)
    /** current question = question at the random index */
    const currentQuestion = this.state.questions[randomQuestionIndex]
    /** remove the question from the question going forward */
    const remainingQuestions = [...this.state.questions]
    remainingQuestions.splice(randomQuestionIndex, 1)
    /** update state */
    this.setState((prevState) => ({
      questions: remainingQuestions,
      currentQuestion,
      loading: false,
      score: prevState.score += bonusPoints,
      questionNumber: prevState.questionNumber + 1,
    }))
  }

  render() {
    return (
      <>
        {this.state.loading && !this.state.done && <div id="loader"/>}
        {!this.state.done
          && !this.state.loading 
          && this.state.currentQuestion 
          && (<div>
                <HUD score={this.state.score} questionNumber={this.state.questionNumber} />
                <Question
                question={this.state.currentQuestion}
                changeQuestion={this.changeQuestion}
                />
              </div>
          )}
          {this.state.done && <h1>Done</h1>}
      </>
    )
  }
}
