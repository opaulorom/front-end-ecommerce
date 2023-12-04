import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(keyword, "keyword")

    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (keyword.trim()) {
      // Realize a ação de pesquisa aqui, por exemplo, redirecione para a página de resultados
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  }, [keyword, navigate]);
  
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
