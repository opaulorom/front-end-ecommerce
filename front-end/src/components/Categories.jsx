import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Categories = () => {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getAllCategories"
        );
        setCategoriesWithProducts(response.data.categoriesWithProducts);
      } catch (error) {
        console.error("Erro ao obter categorias e produtos:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Navbar />
      <div>
        <ul>
          <li onClick={() => handleCategoryClick("Todos")}>
            <h2>Todos</h2>
          </li>
          {categoriesWithProducts.map((category) => (
            <li
              key={category.category}
              onClick={() => handleCategoryClick(category.category)}
            >
              <h2>{category.category}</h2>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>{selectedCategory}</h2>
        {categoriesWithProducts.map((category) => (
          <div
            key={category.category}
            style={{
              display:
                selectedCategory === category.category ||
                selectedCategory === "Todos"
                  ? "block"
                  : "none",
            }}
          >
            <ul>
              {category.subcategories.map((subcategory) => (
                <li key={subcategory}>
                  <h3>{subcategory}</h3>
                  <ul>
                    {category.products
                      .filter(
                        (product) =>
                          selectedCategory === "Todos" ||
                          product.category === selectedCategory
                      )
                      .filter((product) => product.subcategory === subcategory)
                      .map((product) => (
                        <li key={product._id}>
                          <h4>{product.name}</h4>
                          <p>R${product.price}</p>
                          <img
                            src={product.variations[0].urls[0]}
                            alt="Capa do Produto"
                            style={{ maxWidth: "100%", maxHeight: "100px" }}
                          />
                          {/* Outros detalhes do produto conforme necessário */}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
