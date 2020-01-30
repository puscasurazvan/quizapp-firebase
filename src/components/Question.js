import React from 'react'

export default function Question({ question }) {
  return (
    <>
      <h2 dangerouslySetInnerHTML={{__html: question.question}}></h2>
      {question.answerChoices.map(( choice, index) => (
        <div className="choice-container" key={index }>
          <p className="choice-prefix">{index + 1}</p>
          <p className="choice-text"dangerouslySetInnerHTML={{__html: choice}}></p>
        </div>
      ))}
    </>
  )
}