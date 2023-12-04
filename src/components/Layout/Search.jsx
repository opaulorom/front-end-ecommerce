import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Recuperar pesquisas recentes do localStorage
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      // Adicionar a pesquisa à lista de recentes
      const updatedSearches = [keyword, ...recentSearches.slice(0, 4)];
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      // Navegar para a rota de pesquisa
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
