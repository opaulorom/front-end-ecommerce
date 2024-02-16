import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CustomPagination from "./CustomPagination";

const CategorySubcategories = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [mixedProducts, setMixedProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState(new Set());

  const fetchMixedProducts = async (page, filters) => {
    try {
      const queryString = Object.entries(filters)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const response = await fetch(
        `http://localhost:3001/api/categories/${category}/mixedProducts?page=${page}&${queryString}`
      );
      const data = await response.json();
      setMixedProducts(data.mixedProducts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao obter produtos misturados:", error);
    }
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/subcategories/${category}`
        );
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error("Erro ao obter subcategorias:", error);
      }
    };

    const fetchFilters = async () => {
      try {
        // Alterações nas chamadas de API para obter cores, tamanhos e faixas de preço específicos
        const colorsResponse = await fetch(
          `https://serveradmin-whhj.onrender.com/api/categories/${category}/colors`
        );
        const sizesResponse = await fetch(
          `https://serveradmin-whhj.onrender.com/api/categories/${category}/sizes`
        );
        const priceRangesResponse = await fetch(
          `https://serveradmin-whhj.onrender.com/api/categories/${category}/priceRanges`
        );

        const colorsData = await colorsResponse.json();
        const sizesData = await sizesResponse.json();
        const priceRangesData = await priceRangesResponse.json();

        setColors(colorsData);
        setSizes(sizesData);
        setPriceRanges(priceRangesData);

        // Atualizar o conjunto único de tamanhos
        const allSizes = sizesData.reduce((acc, size) => {
          size.split(",").forEach((s) => acc.add(s.trim()));
          return acc;
        }, new Set());
        setUniqueSizes(allSizes);
      } catch (error) {
        console.error("Erro ao obter opções de filtros:", error);
      }
    };

    const fetchOriginalProducts = async () => {
      try {
        // Alteração na chamada de API para obter produtos misturados específicos
        const response = await fetch(
          `https://serveradmin-whhj.onrender.com/api/categories/${category}/mixedProducts`
        );
        const data = await response.json();
        setOriginalProducts(data.mixedProducts);
      } catch (error) {
        console.error("Erro ao obter produtos misturados:", error);
      }
    };

    fetchSubcategories();
    fetchMixedProducts(currentPage, {});
    fetchFilters();
    fetchOriginalProducts();
  }, [category, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleFilterClick = async (filterType, value) => {
    // Atualizar a URL ou executar outras ações conforme necessário
    const filters = {
      [filterType]: value,
    };

    // Se o filtro for cor ou tamanho, encontrar todos os produtos com a mesma cor ou tamanho
    if (filterType === "color" || filterType === "size") {
      let filteredProducts = originalProducts;

      if (filterType === "size") {
        filteredProducts = originalProducts.filter((product) => {
          const productSizes = (product.size || "")
            .split(",")
            .map((size) => size.trim());
          return (
            productSizes.includes(value) ||
            productSizes.some((size) => value.includes(size))
          );
        });
      } else if (filterType === "color") {
        filteredProducts = originalProducts.filter((product) => {
          const productColors = product.variations.map((variation) =>
            (variation.color || "").trim()
          );
          return productColors.includes(value);
        });
      }

      setMixedProducts(filteredProducts);
      setTotalPages(1); // Reiniciar a página para a primeira ao aplicar um novo filtro
    }

    fetchMixedProducts(1, filters);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div>
        <h1>Subcategories of {category}</h1>
        <ul>
          {subcategories.map((subcategory, index) => (
            <li key={index}>
              <Link to={`/categories/${category}/${subcategory}`}>
                {subcategory}
              </Link>
            </li>
          ))}
        </ul>

        <h2>Filtros:</h2>
        <div>
          <h3>Cores</h3>
          {colors.map((color, index) => (
            <div key={index} onClick={() => handleFilterClick("color", color)}    style={{cursor:"pointer"}}>
              {color}
            </div>
          ))}
        </div>

        <div>
          <h3>Tamanhos</h3>
          {Array.from(uniqueSizes).map((size, index) => (
            <div key={index} onClick={() => handleFilterClick("size", size)}    style={{cursor:"pointer"}}>
              {size}
            </div>
          ))}
        </div>

        <div>
          <h3>Faixas de Preço</h3>
          {priceRanges.map((range, index) => (
            <div
              key={index}
              onClick={() => handleFilterClick("priceRange", range)}
              style={{cursor:"pointer"}}
            >
              {range}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Mixed Products of {category}</h2>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {mixedProducts &&
            mixedProducts.map((product) => (
              <li key={product._id || "undefined"}>
                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.variations[0].urls[0]}
                    alt={product.name}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{product.name}</span>
                    <span>
                      {Number(product.price).toFixed(2).padStart(5, "0")}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>

        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CategorySubcategories;
