import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './IssueForm.css';

const IssueForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [level, setLevel] = useState('');
  const [issue, setIssue] = useState('');
  const [issuesArray, setIssuesArray] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  // console.log({name, email, date, level, issue})
  // console.log('issuesArray', issuesArray);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIssue = {
      id: nanoid(),
      name,
      email,
      date,
      level: level || 'not urgent',
      issue
    };
    // console.log('newIssue', newIssue);
    
    setIssuesArray((prevIssues)=> [...prevIssues, newIssue])
    resetValues();
  };

  const resetValues = () => {
    setName('');
    setEmail('');
    setDate('');
    setLevel('');
    setIssue('');
  }

  useEffect(()=>{
    const errors = [];
    if (name.length < 2) errors.push('Name must be 2 or more characters');
    if (!email.includes('@') || !email.includes('.')) errors.push('Enter Valid Email');
    if (!issue.length) errors.push('Please tell us your issue')
    setValidationErrors(errors);
  }, [name, email, issue]);

  return (
    <div>
      <h2>Make A Complaint</h2>

      <form onSubmit={handleSubmit} className='form'>
        <div className='listErrors'>
          {validationErrors && validationErrors.map(error => (
            <p className='errors' key={error}>
              *** {error}
            </p>
          ))}
        </div>
        <div>
          <label htmlFor='name'>Name:</label>
          <input onChange={(event)=>setName(event.target.value)} value={name} id='name' type='text' />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input onChange={(event) => setEmail(event.target.value)} value={email} type='text' />
        </div>
        <div>
          <label htmlFor='level'>Urgency Level:</label>
          <select onChange={(event) => setLevel(event.target.value)} value={level} name='level'>
            <option value='' disabled>
              Select
            </option>
            <option value='urgent'>Urgent</option>
            <option value='not urgent'>Not Urgent</option>
          </select>
        </div>
        <div>
          <label htmlFor='date'>Date:</label>
          <input onChange={(event) => setDate(event.target.value)} value={date} type='date' placeholder='dd/mm/yyyy' />
        </div>
        <div>
          <label htmlFor='issue'>Issue:</label>
          <br />
          <textarea onChange={(event) => setIssue(event.target.value)} value={issue} rows='10' cols='50'></textarea>
        </div>

        <button disabled={validationErrors.length} type='submit'>Submit</button>
      </form>

      <hr />
      <h2>List of Issues:</h2>
    </div>
  );
};

export default IssueForm;
