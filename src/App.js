import "./App.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState, useEffect } from "react";
import { Link, Navigate, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import GamePage from "./pages/GamePage";
import RecordsPage from "./pages/RecordsPage";
import SettingsPage from "./pages/SettingsPage";
import UserPage from "./pages/UserPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  useEffect(() => {
    const p1name = sessionStorage.getItem("playerName1");
    const p2name = sessionStorage.getItem("playerName2");
    if (p1name !== "" && p2name !== "") {
      handleNameChange(1, p1name);
      handleNameChange(2, p2name);
    }
  }, [player1Name, player2Name])

  const handleNameChange = (playerNum, name) => {
    if (playerNum === 1) {
      setPlayer1Name(name);
    } else if (playerNum === 2) {
      setPlayer2Name(name);
    }
    // console.log(`ClientID isss: ${process.env.REACT_APP_GOOGLE_CLIENT_ID}`);
  };
  return (
    <div className='App'>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className='App-wrapper'>
          <header className='App-header'>
            <Link to={"/landing"}>
              <p>Love All Play</p>
            </Link>
          </header>
          <Routes>
            <Route path='/landing' element={<LandingPage />} />
            <Route path='/app/gamepage' element={<GamePage player1Name={player1Name} player2Name={player2Name} />} />
            <Route path='/app/records' element={<RecordsPage />} />
            <Route path='/app/settings' element={<SettingsPage />} />
            <Route path='/app/user' element={<UserPage handleNameChange={handleNameChange} player1Name={player1Name} player2Name={player2Name} />} />
            <Route path='*' element={<Navigate to='/landing' replace />} />
          </Routes>
          <BottomNav />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
