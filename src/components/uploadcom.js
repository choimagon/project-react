import React, { useState } from 'react';
import './uploadcom.css';

function UploadComponent({onClosed}) {
    const [csvFile, setCsvFile] = useState(null);

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const modalStyle = {
        position: 'absolute',
        top: '100%',
        left: '50%',
        margin: '4px',
        width: '300px',
        height: '150px',
        zIndex: 100, // Ensure modal is above other elements
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
    };
    const printttt = () => {
      onClosed();
      console.log("123123");
    };

    return (
        <div className="uploadcom" style={modalStyle}>
            <div className="file-input-container">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <label htmlFor="file-upload" className="custom-file-upload">
                    파일 선택
                </label>
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                />
                <span className="file-name">{csvFile ? csvFile.name : '파일을 선택해주세요'}</span>
            </div>
            <div className="button-container">
                <button className="btn" onClick={printttt}>저장</button>
                <button className="btn" onClick={onClosed}>취소</button>
            </div>
        </div>
    );
}

export default UploadComponent;
