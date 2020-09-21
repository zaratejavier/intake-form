import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import './App.css';
import IntakeForm from './IntakeForm';


function App() {
  const [intake, setIntake] = useState([
    // {
    //   id: 1,
    //   name: "Rick",
    //   email: "test1@gmail.com",
    //   birthDate: "1994-01-02",
    //   contact: true,

    // },
    // {
    //   id: 2,
    //   name: "Bob",
    //   email:"test2@gmail.com",
    //   birthDate: "2000-01-03",
    //   contact: true,

    // },
    // {
    //   id: 3,
    //   name: "Billy",
    //   email:"test3@gmail.com",
    //   birthDate: "1997-01-06",
    //   contact: true,
    // }
  ])

  const addItem = (item) => {  
    debugger
    setIntake([...intake, item])
  }

  const renderInfo = () => {
    return intake.map((item) => (
      <Card>
        <p>{item.id}</p>
        <h1>{item.name}</h1>
        <p>{item.email}</p>
        <p>{item.birthDate}</p>
        <p>{item.contact}</p>


    </Card>
    ))
  }

  return (
    <div className="App">
      <h1>Contact us</h1>
      <IntakeForm addItem={addItem} />
      {renderInfo()}
      
    </div>
  );
}

export default App;


// const handleSubmit = (e) => {
//     e.preventDefault()
//     Axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', userInfo)
//       .then((res) => {
//         addItem(res.data)
//         console.log(userInfo)
//         console.log(res.data)
//       })
//       .catch((e) => {
//         console.log(e)
//       })
//     clearForm()
//   }