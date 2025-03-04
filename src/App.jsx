import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import HomeScreen from "./screens/HomeScreen";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";

function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
      } else {
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
