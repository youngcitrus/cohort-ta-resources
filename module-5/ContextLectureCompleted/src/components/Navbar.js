import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language, french, english } = useLanguage();

  const langChoice = language === 'french' ? french : english; 

  return <nav>{langChoice.languageWord}</nav>;
};

export default Navbar;
