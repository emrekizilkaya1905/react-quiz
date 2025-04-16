import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
const initialState = {
  questions: [],
  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed": {
      return {
        ...state,
        status: "error",
      };
    }
    case "start": {
      return {
        ...state,
        status: "active",
      };
    }
    case "newAnswer": {
      return {
        ...state,
        answer: action.payload,
      };
    }
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceieved", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
