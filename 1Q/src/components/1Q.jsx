import React, { useState } from "react";
import ReactDOM from "react-dom";

function Modal({ onClose }) {
  return ReactDOM.createPortal(
    <div style={{ background: "rgba(0,0,0,0.5)", position: "fixed", inset: 0 }}>
      <div style={{ background: "white", padding: 20, margin: "100px auto", width: 200 }}>
        <p>Hello Modal!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Open Modal</button>
      {show && <Modal onClose={() => setShow(false)} />}
    </div>
  );
}
