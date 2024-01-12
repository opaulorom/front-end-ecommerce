import React, { useState, useEffect, useRef } from "react";
import "./SearchInput.css";
import { useAtom } from 'jotai';
import { searchAtom } from "../Jotai/searchAtom";

const SearchInput = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useAtom(searchAtom);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 699);
  const [isMobileInputOpen, setIsMobileInputOpen] = useState(false);
  const searchContainerRef = useRef();
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 699);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsMobileInputOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

 
  const handleSearch = () => {
    setIsMobileInputOpen(false);
    // Use setSearchTerm directly from the atom
    setSearchTerm(localSearchTerm);
  };
  return (
    <>
      {isMobile ? (
        <div className="search-container" ref={searchContainerRef}>
          <img
            src="https://i.ibb.co/By6TFwq/search-interface-symbol-1.png"
            alt="Search"
            className="search-icon"
            onClick={() => setIsMobileInputOpen(!isMobileInputOpen)}
          />
          {isMobileInputOpen && (
            <div onClick={handleSearch}>
              <input
                type="text"
                placeholder={placeholder}
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="search-container">

          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src="https://i.ibb.co/RQNdWdY/search-interface-symbol-5.png"
            alt="Search"
            className="search-icon"
            onClick={handleSearch}
          />
        </div>
      )}
    </>
  );
};

export default SearchInput;
