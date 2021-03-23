import "./App.scss";
import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import PersonalityQuiz from "./pages/PersonalityQuiz";
import PhotoUpload from "./pages/PhotoUpload";
import Results from "./pages/Results";
import Chat from "./pages/Chat";
import Swipe from "./pages/Swipe";
import SwipeFirebase from "./pages/SwipeFirebase";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AccountDetails from "./pages/AccountDetails";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [result, setResult] = useState("Show me the results");
  const [avatars, setAvatars] = useState([]);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Route path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route
            path="/personalityquiz"
            component={() => (
              <PersonalityQuiz result={result} setResult={setResult} />
            )}
          />
          <Route
            path="/photoupload"
            component={PhotoUpload}
            avatars={avatars}
            setAvatars={setAvatars}
          />
          <Route
            path="/results"
            component={() => <Results result={result} setResult={setResult} />}
          />
          <Route path="/chat" component={Chat} />
          <Route
            path="/accountdetails"
            component={AccountDetails}
            result={result}
            setResult={setResult}
          />
          <Route path="/swipefirebase" component={SwipeFirebase} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
