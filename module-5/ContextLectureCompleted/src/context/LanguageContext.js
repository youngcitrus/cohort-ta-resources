import { createContext, useContext, useState } from 'react';
import { french, english } from '../data/languages';

export const LanguageContext = createContext();

export const LanguageProvider = (props) => {
    const [language, setLanguage] = useState('french');
    return (
        <LanguageContext.Provider value={{language, setLanguage, english, french}}>
            {props.children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    return useContext(LanguageContext);
}