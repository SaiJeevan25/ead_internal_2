import React, { useState } from "react";
import ReactDOM from "react-dom";


// Modal component using React Portal
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeBtnStyle} onClick={onClose}>X</button>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") // make sure this div exists in index.html
  );
};

// Styles for modal
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  maxWidth: "90%",
  position: "relative",
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "transparent",
  fontSize: "18px",
  cursor: "pointer",
};

// Main App
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>React Modal with Portals</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Hello from Modal!</h2>
        <p>This is rendered outside the main DOM hierarchy using portals.</p>
      </Modal>
    </div>
  );
}
