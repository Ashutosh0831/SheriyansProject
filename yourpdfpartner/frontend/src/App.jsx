import { Routes, Route } from "react-router-dom";
import Uploadpdf from "./pages/Uploadpdf.jsx";
import Quiz from "./pages/Quiz.jsx";
import TakeQuiz from "./pages/TakeQuiz.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Uploadpdf />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/Ques" element = {<TakeQuiz/>}/>
      </Routes>
    </div>
  );
};

export default App;
