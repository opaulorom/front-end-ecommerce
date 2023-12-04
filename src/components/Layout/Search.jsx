import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <input
        type="text"
        placeholder="Pesquisar produtos"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">Pesquisar</button>
    </form>
  );
};

export default Search;
