import React from 'react'

import './App.css';
import Container from './Components/Container';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <div className="App container">
        <Header/>
        <Container/>
        <Footer/>
      </div>
    </>
  );
}

export default App;
