import './App.css';
import IntakeForm from './IntakeForm';
import React, { useState } from 'react';

function App() {
  const [intake, setIntake] = useState([])

  const addItem = (item) => {  
    debugger
    setIntake([...intake, item])
  }

  return (
    <div className="body">
      <h1 style={{ fontFamily: "Dancing Script" , padding:"30px", color:"white", fontSize: "40px"}}>Contact us</h1>
      <IntakeForm addItem={addItem} />      
    </div>
  );
}

export default App;