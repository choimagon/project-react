import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onShapeSelect }) => {
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [modelList, setModelList] = useState(['Linear Regression', 'Polynomial Regression', 'Ridge Regression','Lasso Regression']);

  const handleShapeSelect = (shape) => {
    onShapeSelect(shape);
  };

  return (
    <div className="sidebar">
      <h2>모델의 종류</h2>
      <ul>
        <li onClick={() => handleShapeSelect('d')}>Data Upload</li>
        {modelList.map((model, index) => (
          <li key={index} onClick={() => handleShapeSelect(`m${index}`)}>{model}</li>
        ))}
        <li onClick={() => handleShapeSelect('r')}>Result</li>
      </ul>
    </div>
  );
};

export default Sidebar;