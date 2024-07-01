import React, { useState } from 'react';
import './parameterCom.css';
import ParaSetting from './paraSetting';

function ParameterComponent({ onClosed, stype }) {
    const [paraSetOpen, setParaSetOpen] = useState(false);
    const [parameter, setParameter] = useState('');
    const [paraType, setParaType] = useState('');
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
        ["criterion", "maxdepth", "minsamplessplit", "minsampleleaf", "maxfetures"],
        ["estimators", "criterion", "maxdepth", "minsamplessplit", "minsampleleaf", "maxfetures", "bootstrap"],
        ["c", "kernal", "degree", "gamma", "coef0"],
        ["neighbor", "weights", "algorithm", "leaf", "p"],
        ["smooth"],
        ["clusters", "init", "ninits", "maxiter"],
        ["clusters", "linkage"],
        ["eps", "minsamples", "metric"]
    ];
    const boolParameters = ["fit", "copy_x","bootstrap"];
    const floatParameters = ["c","minsamplessplit","minsampleleaf","maxfetures","coef0","smooth","eps"];
    const intParameters = ["maxiter","maxdepth","estimators","degree","neighbor", "leaf", "p","clusters","ninits","minsamples"];


    const modalStyle = {
        position: 'absolute',
        top: '100%',
        left: '70%',
        margin: '4px',
        width: '200px',
        height: '320px',
        zIndex: 100, // Ensure modal is above other elements
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    };
    //파리미터별 설정하는거임
    const handleParameterClick = (parameter) => {
        // console.log(parameter);
        if (boolParameters.includes(parameter)) {
            setParaType('bool');
        }
        if (floatParameters.includes(parameter)) {
            setParaType('float');
        }
        if (intParameters.includes(parameter)) {
            setParaType('int');
        }
        if (parameter == 'solver'){
            setParaType('solver');
        }
        if (parameter == 'penalty'){
            setParaType('penalty');
        }
        if (parameter == 'criterion'){
            setParaType('criterion');
        }
        if (parameter == 'kernal'){
            setParaType('kernal');
        }
        if (parameter == 'weights'){
            setParaType('weights');
        }
        if (parameter == 'algorithm'){
            setParaType('algorithm');
        }
        if (parameter == 'linkage'){
            setParaType('linkage');
        }
        setParaSetOpen(true);
        setParameter(parameter);
    };
    const handleClosedModal = () => {
        setParaSetOpen(false);
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
                            <button className="btn" onClick={()=>{handleParameterClick(param)}}>
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
                {paraSetOpen && <ParaSetting onClosed={handleClosedModal} para={parameter} ty ={paraType}/>}
            </div>
        </div>
    );
}

export default ParameterComponent;
