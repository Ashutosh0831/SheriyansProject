import { useNavigate } from "react-router-dom"

const Quiz = () => {

  const navigate = useNavigate()
  const takeQuiz = ()=>{
    navigate("/Ques")
  }
  return (
    <>
    <div className="quiz-conatiner">
        <div className="pdf-data">PDF DATA</div>
        <button onClick={takeQuiz}>Take quiz</button></div></>
  )
}

export default Quiz
