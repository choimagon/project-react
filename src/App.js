// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import GridPage from './components/GridPage';
import './App.css';

function App() {
  const [shape, setShape] = useState([]);
  console.log("app",shape);
  const handleShapeSelect = (selectedShape) => {
    setShape(prevShape => [...prevShape, selectedShape]);
  };
  return (
    <div className="app">
      <Sidebar onShapeSelect={handleShapeSelect} />
      <GridPage shape={shape} onShapeSelect={setShape} />
    </div>
  );
}

export default App;