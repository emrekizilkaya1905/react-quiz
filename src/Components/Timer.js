import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedSeconds = String(seconds).padStart(2, "0");
  useEffect(
    function () {
      const id = setInterval(function () {
        console.log("tick");
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {" "}
      {minutes}:{formattedSeconds}
    </div>
  );
}

export default Timer;
