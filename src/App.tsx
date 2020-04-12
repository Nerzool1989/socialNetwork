import React from 'react';
import './App.css';
import {Footer} from './components/footer/Footer';
import {Header} from './components/header/Header';
import Navbar from './components/navigation/Navigation';
import Profile from './components/profile/Profile';

function App() {
  return (
    <div className="App__wrapper">
      <Header />
      <Navbar />
      <Profile />
      <Footer />
    </div>
  );
}

export default App;
