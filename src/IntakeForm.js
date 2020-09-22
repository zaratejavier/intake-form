import React, { useState } from "react"
import { Button, Form } from "semantic-ui-react"
import moment from 'moment';
import Axios from "axios"
import "./IntakeForm.css"


const IntakeForm = ({addItem}) => {
  const [name, setName] = useState('')
  const [nameChanged, setNameChanged] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [contact, setContact] = useState(false)

  const userInfo = {
    id: Math.floor(Math.random() * 1000),
    name: name,
    email: email,
    birthDate: birthDate === '' ? '' : moment(birthDate, 'MM/DD/YYYY').format('YYYY-MM-DD'),
    contact: contact
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   debugger;
  //   Axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', userInfo)
  //     .then((res) => {
  //       addItem(res.data)
  //       console.log(res.data)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  //   clearForm()
  // }

  const message = () => {
    alert("Successful")
  }

  const handleSubmit = (e) => {
    // debugger;
    e.preventDefault()
    addItem(userInfo)
    message()
    clearForm()
  }

  const clearForm = () => {
    setName("")
    setEmail("")
    setBirthDate("")
    setContact(!contact)
  }

  const isNameValid = () => {
    return name  && name.trim() 
  }

  const isEmailValid = () => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    return email && pattern.test(email)
  }

  const isBirthDateValid = () => {
    return birthDate === '' || moment(birthDate, 'MM/DD/YYYY', true).isValid()
  }

  const isFormValid = () => {
    return isNameValid() && isEmailValid() && (isBirthDateValid() || birthDate === '') && contact;

  }

  // TODO: make an email changed function like this one 
  const nameChangedFunc = (e) => {
        setNameChanged(true)
        setName(e.target.value)
  }

  return (
    <Form onSubmit={handleSubmit} className="container" size="huge" key="huge">
      <div style={nameChanged && !isNameValid() ? {display: ""} : {display: "none"}}>Name invalid</div>

      <Form.Input
        className="form__name"
        error={nameChanged && !isNameValid()}
        label="Name"
        name="name"
        placeholder="Name"
        value={name}
        autoFocus
        onChange={(e) => nameChangedFunc(e)}
        required
      />

      {/* <TextField
        error={!isEmailValid()}
        id="standard-error-helper-text"
        label="email"
        hintText="Email"
        onChange={(e) => setEmail(e.target.value)}
        helperText={errorText}
        ></TextField> */}
      <Form.Input 
        className="form__name"
        error={!isEmailValid()}
        label="Email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type='email'
      />
      <Form.Input 
        className="form__name"
        error={!isBirthDateValid()}
        label="Birth date"
        name="Birth date"
        placeholder="Format Date MM/DD/YYYY"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <Form.Checkbox
        label='I agree to be contacted via email'
        name="contact"
        checked={contact}
        onChange={() => setContact(!contact)}
        required
      />
      <div className="buttons">
        <div className="buttonClear">
          <Button onClick={() => clearForm()} >Clear</Button>
        </div>
        <div className="buttonSubmit">
          <Button style={
          isFormValid() ? { ...styles.green } : styles.red
          } disabled={!isFormValid()}>Submit</Button>
        </div>
      </div>  
    </Form>
  )
}

const styles = {
  red: { color:"red" },
  green: {
    color:"green",
  },
}

export default IntakeForm