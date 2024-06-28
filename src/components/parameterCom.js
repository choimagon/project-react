import React, { useState } from 'react';
import './parameterCom.css';

function parameterComponent({onClosed, stype}) {
    // const [modelList, setModelList] = useState([
    //     "Linear Regression",
    //     "Logistic Regression",
    //     "Decision Tree",
    //     "Random Forest",
    //     "Support Vector Machine",
    //     "K-Nearest Neighbors",
    //     "Naive Bayes",
    //     "K-Means",
    //     "Hierarchical Clustering",
    //     "DBSCAN"]);  
    const modalStyle = {
        position: 'absolute',
        top: '100%',
        left: '70%',
        margin: '4px',
        width: '200px',
        height: '300px',
        zIndex: 100, // Ensure modal is above other elements
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
    };

    return (
        <div className="uploadcom" style={modalStyle}>
            <span>{stype}</span>
            <span>파라미터</span>
            <br></br>
            <br></br>
            <div className="button-container">
                <button className="btn" onClick={onClosed}>이거</button>
                <button className="btn" onClick={onClosed}>저거</button>
            </div>
        </div>
    );
}

export default parameterComponent;
