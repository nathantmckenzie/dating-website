import React, { useState } from "react";
import Question from "./Question";
import Results from "./Results";

export default function PersonalityQuiz({ result, setResult }) {
  return (
    <div>
      <Question result={result} setResult={setResult} />
    </div>
  );
}
