import "./App.scss";
import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { app, firebaseAuth } from "./base";
import Home from "./pages/Home";
import PersonalityQuiz from "./pages/PersonalityQuiz";
import PhotoUpload from "./pages/PhotoUpload";
import Results from "./pages/Results";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import SwipeFirebase from "./pages/SwipeFirebase";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AccountDetails from "./pages/AccountDetails";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [details, setDetails] = useState();
  const [result, setResult] = useState();
  const [avatars, setAvatars] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  const db = app.firestore();

  useEffect(() => {
    let firebaseData;
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        firebaseData = querySnapshot.docs.map(function (doc) {
          // doc.id

          return doc.data();
        });
      })
      .then(() => setDetails(firebaseData))
      .then(() => console.log(("DETAILS", details)));
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
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
          <Route
            path="/swipefirebase"
            component={() => (
              <SwipeFirebase details={details} setDetails={setDetails} />
            )}
          />
          <Route
            path="/settings"
            component={() => (
              <Settings details={details} setDetails={setDetails} />
            )}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
