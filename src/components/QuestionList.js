import React from "react";

function QuestionList({ questions, onDelete }) {
  questions = Array.from(questions);
  const list = questions.map((question) => {
    const answers = question.answers;
    function handleDeleteClick() {
      fetch(`http://localhost:4000/questions/${question.id}`, {
        method: "DELETE"
      })
      .then(r => r.json())
      .then(() => onDelete(question))
    }
    function handleChange(e) {
      fetch(`http://localhost:4000/questions/${question.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({correctIndex: Number(e.target.value)})
      })
      .then(r => r.json())
      .then(data => console.log(data));
    }
    return (
      <li key={question.id}>
        <h3>{question.prompt}</h3>
        {answers.map((answer) => <div key={answer}><button>{answer}</button><br /><br /></div>)}
        <label>Correct Answer:
          <select name="correctIndex" onChange={handleChange} defaultValue={question.correctIndex}>
            {answers.map((answer, index) => <option value={index} key={index}>{answer}</option>)}
          </select>
        </label>
        <br /><br /><button onClick={handleDeleteClick}>Delete Question</button>
      </li>
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{list}</ul>
    </section>
  );
}

export default QuestionList;
