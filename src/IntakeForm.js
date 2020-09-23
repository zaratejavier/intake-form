import Axios from "axios"
import { Button, Form, Label} from "semantic-ui-react"
import "./IntakeForm.css"
import moment from 'moment';
import React, { useState } from "react"


const IntakeForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [nameChanged, setNameChanged] = useState(false)
  const [emailChanged, setEmailChanged] = useState(false)
  const [dateChanged, setDateChanged] = useState(false)
  const [contact, setContact] = useState(false)
  const [message, setMessage ] = useState('');

  const userInfo = {
    id: Math.floor(Math.random() * 1000),
    name: name,
    email: email,
    birthDate: birthDate === '' ? '' : moment(birthDate, 'MM/DD/YYYY').format('YYYY-MM-DD'),
    contact: contact
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    Axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', userInfo)
      .then((res) => {
        console.log(res.data)
        successMessage();
        setTimeout(removeMessage, 3000);
        clearForm()
      })
      .catch((e) => {
        console.log(e)
      })
    clearForm()
  }

  const removeMessage = () => {
		setMessage('');
	};

  const clearForm = () => {
    setName("")
    setEmail("")
    setBirthDate("")
    setContact(!contact)
    setNameChanged(false)
    setEmailChanged(false)
    setDateChanged(false)
  }

  const successMessage = () => {
		setMessage(`Thank you ${name}! You will now be contacted via email.`);
	};

  const isNameValid = () => {
    return name  && name.trim() 
  }

  const isEmailValid = () => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    return email && pattern.test(email) && email.trim() 
  }

  const isBirthDateValid = () => {
    return birthDate === '' || moment(birthDate, 'MM/DD/YYYY', true).isValid()
  }

  const isFormValid = () => {
    return isNameValid() && isEmailValid() && (isBirthDateValid() || birthDate === '') && contact;
  }

  const nameChangedFunc = (e) => {
    setNameChanged(true)
    setName(e.target.value)
  }

  const emailChangedFunc = (e) => {
    setEmailChanged(true)
    setEmail(e.target.value)
  }

  const dateChangedFunc = (e) => {
    setDateChanged(true)
    setBirthDate(e.target.value)
  }

  const showErrorStyle = (show) => {
    return show ? { display: "", color: "red" } : { display: "none" }
  }

  return (
    <Form onSubmit={handleSubmit} className="container" size="huge" key="huge">
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
      <span className="label1" style={showErrorStyle(nameChanged && !isNameValid())}>
        <Label basic color='red' pointing>
          The name cannot be empty
        </Label>
      </span>
      <Form.Input 
        className="form__name"
        error={ emailChanged && !isEmailValid()}
        label="Email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => emailChangedFunc(e)}
        required
        type='email'
      />
      <span className="label1" style={showErrorStyle(emailChanged && !isEmailValid())}>
        <Label basic color='red' pointing>
          Please enter a valid Email
        </Label>
      </span>
      <Form.Input 
        className="form__name"
        error={!isBirthDateValid()}
        label="Birth date"
        name="Birth date"
        placeholder="Format Date MM/DD/YYYY"
        value={birthDate}
        onChange={(e) => dateChangedFunc(e)}
      />
       <span className="label1" style={showErrorStyle(dateChanged && !isBirthDateValid())}>
        <Label basic color='red' pointing>
          Please enter a valid date
        </Label>
      </span>

      <Form.Checkbox
        label='I agree to be contacted via email'
        name="contact"
        checked={contact}
        onChange={() => setContact(!contact)}
        required
      />
      <div className="buttons">
        <div className="buttonClear">
          <Button type="button" onClick={() => clearForm()} >Clear</Button>
        </div>
        <div className="buttonSubmit">
          <Button style={
          isFormValid() ? { ...styles.green } : styles.red
          } disabled={!isFormValid()}>Submit</Button>
        </div>
      </div>  
      <div className="message">
				<p>{message}</p>
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