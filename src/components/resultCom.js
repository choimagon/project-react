import React, { useState } from 'react';
import './resultCom.css';

function resultComponent({onClosed}) {
    const modalStyle = {
        position: 'absolute',
        top: '100%',
        left: '70%',
        margin: '4px',
        width: '200px',
        height: '70px',
        zIndex: 100, // Ensure modal is above other elements
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
    };

    return (
        <div className="uploadcom" style={modalStyle}>
            <p>종류를 선택하세요.</p>
            <div className="button-container">
                <button className="btn" onClick={onClosed}>예측</button>
                <button className="btn" onClick={onClosed}>분류</button>
            </div>
        </div>
    );
}

export default resultComponent;
