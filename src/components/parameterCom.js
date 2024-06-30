import React from 'react';
import './parameterCom.css';

function ParameterComponent({ onClosed, stype }) {
    const modelList = [
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
    ];

    const modelParaList = [
        ["fit", "copy_x"],
        ["c", "solver", "maxiter", "penalty"],
        ["criterion", "maxdepth", "minsamplesplit", "minsampleleaf", "maxfetures"],
        ["estimators", "criterion", "maxdepth", "minsamplessplit", "minsampleleaf", "maxfeture", "bootstrap"],
        ["c", "kernal", "degree", "gamma", "coef0"],
        ["neighbor", "weights", "algorithm", "leaf", "p"],
        ["smooth"],
        ["clusters", "init", "ninits", "maxiter"],
        ["clusters", "linkage"],
        ["eps", "minsamples", "metric"]
    ];

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
        borderRadius: '8px',
    };

    const handleParameterClick = (parameter) => {
        // Handle the click for the parameter (example: console.log(parameter))
        console.log(parameter);
    };

    const handleButtonClick = () => {
        // Find the index of stype in modelList
        const index = modelList.findIndex(item => item === stype);
        if (index !== -1) {
            const parameters = modelParaList[index];
            return (
                <div>
                    {parameters.map((param, idx) => (
                        <div key={idx}>
                            <button className="btn" onClick={() => handleParameterClick(param)}>
                                {param}
                            </button>
                            <br />
                        </div>
                    ))}
                    <br />
                    <br />
                    <button className="btn" onClick={onClosed}>닫기</button>
                </div>
            );
        }
    };

    return (
        <div className="uploadcom" style={modalStyle}>
            <span>{stype}</span>
            <span>파라미터</span>
            <br /><br />
            <div className="button-container-para">
                {handleButtonClick()}
            </div>
        </div>
    );
}

export default ParameterComponent;
