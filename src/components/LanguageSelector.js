import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLanguage } from '../Store/MovieSlice';
import { POPULAR_LANGUAGES } from '../utils/constants';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((store) => store.movie.selectedLanguage);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (languageCode) => {
    dispatch(setSelectedLanguage(languageCode));
    setIsOpen(false);
  };

  const currentLanguage = POPULAR_LANGUAGES.find(lang => lang.code === selectedLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="hidden md:block">{currentLanguage?.name}</span>
        <span className="md:hidden">{currentLanguage?.code}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {POPULAR_LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 ${
                  selectedLanguage === language.code ? 'bg-gray-700' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-white">{language.name}</span>
                {selectedLanguage === language.code && (
                  <svg className="w-4 h-4 ml-auto text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 