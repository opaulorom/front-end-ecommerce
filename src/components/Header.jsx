import React from "react";
import "./Header.css";
import SearchInput from "./SearchInput";
import { useAtom } from 'jotai';
import { searchAtom } from "../Jotai/searchAtom";
import SearchBar from "./SearchBar";

const Header = () => {
  const [searchTerm, setSearchTerm] = useAtom(searchAtom);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <div className="ContainerHeader">
      <h1>Logo</h1>
      <div style={{marginRight:"5rem"}}>
        {" "}
        <SearchBar/>
      </div>
    </div>
  );
};

export default Header;
