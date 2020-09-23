import './App.css';
import IntakeForm from './IntakeForm';
import React from 'react';

function App() {
  return (
    <div className="body">
      <h1 style={{ fontFamily: "Dancing Script" , padding:"30px", color:"white", fontSize: "40px"}}>New Particpant Form</h1>
      <IntakeForm />      
    </div>
  );
}

export default App;