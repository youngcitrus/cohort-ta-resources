import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { setLanguage, english, french, language } = useLanguage();

  const langChoice = language === 'english' ? english : french;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName);
  };

  return (
    <>
      <h1>{langChoice.greeting} 😃!</h1>
      <h2>
        {langChoice.select} 
        <span onClick={() => setLanguage('french')}>FR</span> |
        <span onClick={() => setLanguage('english')}>EN</span>
      </h2>
      <p>{langChoice.instruction}</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder={langChoice.firstName}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type='text'
          placeholder={langChoice.lastName}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type='submit'>{langChoice.button}</button>
      </form>
    </>
  );
}
