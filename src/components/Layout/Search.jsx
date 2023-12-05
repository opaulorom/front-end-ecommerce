import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate("/");
    }
  };

  const fetchSuggestions = async () => {
    // Implemente a lógica para buscar sugestões com base no keyword
    // Isso pode ser uma chamada à API ou uma lógica local
    // Aqui está um exemplo simples
    const response = await fetch(`http://localhost:3001/api/products/suggestions?keyword=${keyword}`);
    const data = await response.json();
    setSuggestions(data.suggestions);
  };

  useEffect(() => {
    if (keyword.trim()) {
      // Chame a função para buscar sugestões quando o usuário digitar
      fetchSuggestions();
    } else {
      // Limpe as sugestões se o campo de pesquisa estiver vazio
      setSuggestions([]);
    }
  }, [keyword]);

  return (
    <form onSubmit={searchHandler}>
      <input
        type="text"
        placeholder="Pesquisar produtos"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">Pesquisar</button>

      {/* Renderize as sugestões */}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </form>
  );
};

export default Search;
