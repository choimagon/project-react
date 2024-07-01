import React, { useState } from 'react';
import './paraSetting.css';

function ParameterSetting({ onClosed, para, ty }) {
    const [number, setNumber] = useState(0);
    const [ft, setFT] = useState(true);

    const typeBool = ty === 'bool';
    const typeFloat = ty === 'float';
    const typeInt = ty === 'int';
    const typeInput = typeFloat || typeInt;
    const typeSolver = ty === 'solver';
    const typePenalty = ty === 'penalty';
    const typeCriterion = ty === 'criterion';
    const typeKernal = ty === 'kernal';
    const typeWeights = ty === 'weights';
    const typeAlgorithm = ty === 'algorithm';
    const typeLinkage = ty === 'linkage';

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '4px',
        width: '200px', // Adjust width to accommodate the input field
        height: '200px', // Adjust height to accommodate the input field
        zIndex: 100, // Ensure modal is above other elements
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0.1, 0.5)',
        borderRadius: '8px'
    };
    const checkPointBtn = () => {
        console.log(number);
        console.log(ft);
        onClosed();
    };

    return (
        <div className="uploadcom" style={modalStyle}>
            <span>{para}</span>
            <br /><br />
            {typeInput&&<div className="input-container">
                <label>
                    입력 :{' '}
                    {typeInt&&<input
                        type="number"
                        value={number}
                        min="0"
                        onChange={handleNumberChange}
                        className="number-input"
                    />}
                    {typeFloat&&<input
                        type="number"
                        step="0.01"
                        min="0"
                        value={number}
                        onChange={handleNumberChange}
                        className="number-input"
                    />}
                </label>
                <br /><br />
                <span>{typeFloat === true ? 'Float형태':'Integer형태'} </span>
            </div>}
            {typeBool&&<div className="input-container">
                <button className={`btn ${ft === true ? 'active' : ''}`} onClick={()=>{setFT(true)}}>True</button>
                <button className={`btn ${ft === false ? 'active' : ''}`} onClick={()=>{setFT(false)}}>False</button>
                <br /><br />
            </div>}
            {typeSolver&&<div className="input-container">
                <select name="paralist" className="conlist">
                    <option value="lbfgs">lbfgs</option>
                    <option value="liblinear">liblinear</option>
                    <option value="newton-cg">newton-cg</option>
                    <option value="newton-cholesky">newton-cholesky</option>
                    <option value="sag">sag</option>
                    <option value="saga">saga</option>
                </select>
                <br /><br />
            </div>}
            {typePenalty&&<div className="input-container">
                <select name="paralist" className="conlist">
                    <option value="l1">l1</option>
                    <option value="l2">l2</option>
                    <option value="elasticnet">elasticnet</option>
                    <option value="none">none</option>
                </select>
                <br /><br />
            </div>}
            {typeCriterion&&<div className="input-container">
                <select name="paralist" className="conlist">
                    <option value="gini">gini</option>
                    <option value="entropy">entropy</option>
                    <option value="log_loss">log_loss</option>
                </select>
                <br /><br />
            </div>}
            {typeKernal&&<div className="input-container">
                <select name="paralist" className="conlist">
                    <option value="linear">linear</option>
                    <option value="poly">poly</option>
                    <option value="rbf">rbf</option>
                    <option value="sigmoid">sigmoid</option>
                    <option value="precomputed">precomputed</option>
                </select>
                <br /><br />
            </div>}
            {typeWeights&&<div className="input-container">
                <select name="paralist" className="conlist">
                    <option value="uniform">uniform</option>
                    <option value="distance">distance</option>
                </select>
                <br /><br />
            </div>}
            {typeAlgorithm&&<div className="input-container">
                <select name="paralist" className="conlist">
                    <option value="auto">auto</option>
                    <option value="ball_tree">ball_tree</option>
                    <option value="kd_tree">kd_tree</option>
                    <option value="brute">brute</option>
                </select>
                <br /><br />
            </div>}
            {typeLinkage&&<div className="input-container">
                <select name="paralist" className="conlist">
                    <option value="ward">ward</option>
                    <option value="complete">complete</option>
                    <option value="average">average</option>
                    <option value="single">single</option>
                </select>
                <br /><br />
            </div>}
            <div className="button-container">
                <button className="btn" onClick={checkPointBtn}>확인</button>
            </div>
        </div>
    );
}

export default ParameterSetting;
