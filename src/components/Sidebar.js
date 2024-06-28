import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onShapeSelect }) => {
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [modelList, setModelList] = useState([
    "Linear Regression",
    "Logistic Regression",
    "Decision Tree",
    "Random Forest",
    "Support Vector Machine",
    "K-Nearest Neighbors",
    "Naive Bayes",
    "K-Means",
    "Hierarchical Clustering",
    "DBSCAN"
  ]);

  const handleShapeSelect = (shape) => {
    onShapeSelect(shape);
  };

  return (
    <div className="sidebar">
      <h2>모델의 종류</h2>
      <ul>
        <li className='data' onClick={() => handleShapeSelect('d')}>Data Upload</li>
        {modelList.map((model, index) => (
          <li key={index} onClick={() => handleShapeSelect(`m${index}`)}>{model}</li>
        ))}
        <li onClick={() => handleShapeSelect('r')}>Result</li>
      </ul>
    </div>
  );
};

export default Sidebar;