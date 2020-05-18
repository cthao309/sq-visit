// ? Import required modules
import React, { useState } from 'react'
import { postVisitor } from '../lib/asyncFunctions'

import './VisitorForm.css'
import Logo from '../img/TLM-Logo.png'

// ? Create a React functional component (VisitorForm) using React Hooks
const VisitorForm = () => {
  // ?  Create variable fields (useState accepts two parameters - state and setState)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [purpose, setPurpose] = useState('');
  const [status, setStatus] = useState('');

  // ? On click event create an object (visitor record with the values of form fields)
  const handleSubmit = (event) => {
    event.preventDefault()
    const visitorRecord = {
      lastName,
      firstName,
      company,
      purpose,
    }
    // ? Establish conditional statement to ensure all form fields are required
    // ? else submit a flash message
    if (!lastName && !firstName && !company && !purpose) {
      const flash = { msg: 'All Fields Are Required' };
      setStatus(flash);
    } else if (!firstName) {
      const flash = { nameRequired: 'First name is required' };
      setStatus(flash)
    } else if (!lastName) {
      const flash = { lastNameRequired: 'Last name is required' };
      setStatus(flash)
    } else if (!company) {
      const flash = { companyRequired: 'Company name is required' };
      setStatus(flash)
    } else if (!purpose) {
      const flash = { purposeRequired: 'Purpose is required' };
      setStatus(flash)
    } else if (lastName && firstName && company && purpose) {
      // ? postVisitor is a Post request from asyncFunctions
      // ? which accepts the submitted form fields (visitorRecord)
      postVisitor(visitorRecord)
        .then((res) => {
          if (res.status === 'error') {
            setStatus('There was an error, please try again');
          }
          if (res.status === 'ok') {
            const success = { msg: 'Thank you for visiting San Quentin' }
            setStatus(success)
            setFirstName('');
            setLastName('');
            setCompany('');
            setPurpose('');
          }
        })
        .catch(err => err);
    }
  }
  // ? Render the Visitor form
  return (
    <div className="Visitor_Form">
      <form onSubmit={handleSubmit}>
        <div className="Visitor_form_container">
          <img src={Logo} alt="Logo" />
          <div className="Visitor_Form_logo-text">
            <h1>Welcome to Code 7370</h1>
          </div>
          <h2>Please sign in:</h2>

          <div className="input_container">
            <label htmlFor="firstName">
              <input
                className={status.nameRequired ? 'errorStyle Visitor_input' : 'Visitor_input'}
                type="text"
                placeholder={status.nameRequired || 'Your first Name'}
                name="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </label>
          </div>

          <div className="input_container">
            <label htmlFor="lastName">
              <input
                className={status.lastNameRequired ? 'errorStyle Visitor_input' : 'Visitor_input'}
                type="text"
                placeholder={status.lastNameRequired || 'Your last name'}
                name="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </label>
          </div>

          <div className="input_container">
            <label htmlFor="company">
              <input
                className={status.companyRequired ? 'errorStyle Visitor_input' : 'Visitor_input'}
                type="text"
                placeholder={status.companyRequired || 'Your company name'}
                name="company"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
            </label>
          </div>

          <div className="input_container">
            <label htmlFor="purpose">
              <input
                className={status.purposeRequired ? 'errorStyle Visitor_input' : 'Visitor_input'}
                type="text"
                name="purpose"
                placeholder={status.purposeRequired || 'What brings you here today?'}
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="Visitor_submit">
          <input
            type="submit"
            value="Sign in"
          />
        </div>
        <div className="Visitor_message">
          <p>{status.msg}</p>
        </div>
      </form>

    </div>
  )
}
export default VisitorForm
