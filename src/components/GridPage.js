import React, { useState, useEffect } from 'react';
import './GridPage.css';
import Uploadcom from './uploadcom';
import Resultcom from './resultCom';
import ParaCom from './parameterCom';

const ModalContent = ({ shapeType, position, onClose, onDelete, onConnect }) => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [paraOpen, setParaOpen] = useState(false);
  // Calculate modal position based on shape's position
  const modalStyle = {
    position: 'absolute',
    top: position.y + 70 + 'px',
    left: position.x + 120 + 'px',
    margin: '4px',
    width: '140px',
    height: '200px',
    zIndex: 1000, // Ensure modal is above other elements
    transform: 'translate(-50%, -50%)',
    padding: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px'
  };

  // Determine if the '파라미터' button should be hidden
  const hideParameterButton = shapeType === 'Data Upload' || shapeType === 'Result';
  const hideUploadBtn = shapeType === 'Data Upload';
  const hideResultBtn = shapeType === 'Result';
  const handleCloseModal = () => {
    setUploadOpen(false);
  };
  const handleClosedModal = () => {
    setResultOpen(false);
  };
  const handleClosepModal = () => {
    setParaOpen(false);
  };
  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <button className="exit" onClick={onClose}>X</button>
        <p>{shapeType}</p>
        <button className="btn" onClick={onConnect}>연결하기</button>
        {!hideParameterButton && <button className="btn"onClick={()=>{setParaOpen(true)}}>파라미터</button>}
        {hideUploadBtn && <button className="btn" onClick={()=>{setUploadOpen(true)}}>업로드</button>}
        {hideResultBtn && <button className="btn" onClick={()=>{setResultOpen(true)}}>종류</button>}
        {uploadOpen && <Uploadcom onClosed={handleCloseModal}/>}
        {resultOpen && <Resultcom onClosed={handleClosedModal}/>}
        {paraOpen && <ParaCom onClosed={handleClosepModal} stype={shapeType}/>}
        <button className="btn" onClick={onDelete}>삭제하기</button>
      </div>
    </div>
  );
};


const GridPage = ({ shape, onShapeSelect }) => {
  const [shapesState, setShapesState] = useState([]);
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShapeType, setSelectedShapeType] = useState('');
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  const [listIndex, setListIndex] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingShapeIndex, setConnectingShapeIndex] = useState(null);
  const [connections, setConnections] = useState([]);
  // Initialize shapesState based on shape prop
  useEffect(() => {
    if (shape && shape.length > 0) {
      const newShapesLength = shape.length - shapesState.length;
      if (newShapesLength > 0) {
        const newShapes = shape.slice(-newShapesLength);
        const newShapesState = newShapes.map((shapeItem) => ({
          isDragging: false,
          position: { x: 0, y: 0 },
          offset: { x: 0, y: 0 },
          shapetype: shapeItem
        }));
        setShapesState(prevState => [...prevState, ...newShapesState]);
      }
    }
  }, [shape, shapesState]);

  const handleMouseDown = (e, index) => {
    if (isConnecting) {
      // If in connecting mode, click should select the shape to connect to
      setConnections([...connections, { from: connectingShapeIndex, to: index }]);
      setIsConnecting(false);
      setConnectingShapeIndex(null);
    } else {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const sidebarWidth = (window.innerWidth) * 0.2 + 40;
      const gridPageLeft = sidebarWidth;

      const shapeX = shapesState[index].position.x + gridPageLeft + 0;
      const shapeY = shapesState[index].position.y + 0;

      const newShapesState = [...shapesState];
      newShapesState[index].offset = { x: mouseX - shapeX, y: mouseY - shapeY };
      newShapesState[index].isDragging = true;
      setShapesState(newShapesState);
    }
  };

  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const sidebarWidth = (window.innerWidth) * 0.2 + 40;
    const gridPageLeft = sidebarWidth;

    const newShapesState = shapesState.map((shape) => {
      if (shape.isDragging) {
        const offsetX = mouseX - gridPageLeft - shape.offset.x;
        const offsetY = mouseY - shape.offset.y;
        return { ...shape, position: { x: offsetX, y: offsetY } };
      }
      return shape;
    });

    setShapesState(newShapesState);
  };

  const handleMouseUp = () => {
    const newShapesState = shapesState.map((shape) => ({
      ...shape,
      isDragging: false
    }));
    setShapesState(newShapesState);
  };

  const handleContextMenu = (e, index) => {
    e.preventDefault(); // Prevent default context menu
    setListIndex(index);
    const clickedShapeType = shapesState[index].shapetype.startsWith('m') ? modelList[parseInt(shapesState[index].shapetype.substring(1))] : shapesState[index].shapetype.startsWith('r') ? 'Result':'Data Upload';
    setSelectedShapeType(clickedShapeType);
    setSelectedShapeIndex(index);
    setModalPosition({ x: shapesState[index].position.x, y: shapesState[index].position.y });
    setModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteShape = () => {
    if (selectedShapeIndex !== null && selectedShapeIndex >= 0 && selectedShapeIndex < shapesState.length) {
        const newShapesState = shapesState.filter((_, index) => index !== selectedShapeIndex);
        
        // 삭제된 도형과 관련된 연결 제거
        const newConnections = connections.filter(conn => conn.from !== selectedShapeIndex && conn.to !== selectedShapeIndex)
                                          .map(conn => ({
                                              from: conn.from > selectedShapeIndex ? conn.from - 1 : conn.from,
                                              to: conn.to > selectedShapeIndex ? conn.to - 1 : conn.to
                                          }));

        setShapesState(newShapesState);
        setConnections(newConnections);
        handleCloseModal(); // Close modal
    
        // Reset index after closing modal
        setSelectedShapeIndex(null);
    
        // Update parent component with new shape types after deletion
        const updatedShapeTypes = newShapesState.map(shapeItem => shapeItem.shapetype);
        onShapeSelect(updatedShapeTypes);
    }
};

  const handleConnectShape = () => {
    setIsConnecting(true);
    setConnectingShapeIndex(selectedShapeIndex);
    handleCloseModal();
  };

  const printConnectedShapes = () => {
    // Create a copy of connections array to work with
    const connectionsCopy = [...connections];

    // Array to store the connected shape indices in order
    const connectedShapeIndices = [];

    // Find starting point (shape without any incoming connection)
    const startingIndex = connectionsCopy.find(conn => connectionsCopy.every(otherConn => otherConn.to !== conn.from))?.from;

    if (startingIndex !== undefined) {
      // Start from the starting index and trace the connections
      let currentIndex = startingIndex;
      while (currentIndex !== undefined) {
        connectedShapeIndices.push(currentIndex);
        // Find the next connected shape index
        const nextConnection = connectionsCopy.find(conn => conn.from === currentIndex);
        // Remove the connection from the copy to avoid re-tracing
        if (nextConnection) {
          connectionsCopy.splice(connectionsCopy.indexOf(nextConnection), 1);
          currentIndex = nextConnection.to;
        } else {
          currentIndex = undefined;
        }
      }

      // Output connected shape indices to console
      // console.log("Connected shapes in order:", connectedShapeIndices.map(index => `${shape[index]} `).join(''));
      alert(connectedShapeIndices.map(index => `${shape[index]} `).join(''));
    } else {
      console.log("No connected shapes found.");
    }
  };

  return (
    <div className="grid-page" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <svg className="connection-lines" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {connections.map((conn, index) => {
          const fromShape = shapesState[conn.from];
          const toShape = shapesState[conn.to];

          const x1 = fromShape.position.x + 50; // Adjust as necessary
          const y1 = fromShape.position.y + 25; // Adjust as necessary
          const x2 = toShape.position.x + 50; // Adjust as necessary
          const y2 = toShape.position.y + 25; // Adjust as necessary

          return (
            <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
          );
        })}
      </svg>
      {shapesState.map((shape, index) => (
        <div
          key={index}
          className={`shape ${shape.shapetype}`}
          style={{ left: shape.position.x, top: shape.position.y }}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onContextMenu={(e) => handleContextMenu(e, index)}
        >
          {shape.shapetype.startsWith('m') ? modelList[parseInt(shape.shapetype.substring(1))] : shape.shapetype.startsWith('r') ? 'Result': 'Data Upload'}
        </div>
      ))}
      {modalOpen && (
        <ModalContent
          shapeType={selectedShapeType}
          position={modalPosition}
          onClose={handleCloseModal}
          onDelete={handleDeleteShape}
          onConnect={handleConnectShape}
        />
      )}
      {/* Button to print connected shapes */}
      <button onClick={printConnectedShapes} style={{ position: 'fixed', top: '10px', left: '45%', zIndex: '1000' }}>
        Print Connected Shapes
      </button>
    </div>
  );
};

export default GridPage;