import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => setQuestions(data));
  }, [])

  function handleFormSubmit(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDelete(deletedQuestion) {
    console.log(deletedQuestion);
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    console.log(updatedQuestions);
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onFormSubmit={handleFormSubmit} /> : <QuestionList questions={questions} onDelete={handleDelete} />}
    </main>
  );
}

export default App;
