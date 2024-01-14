import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
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
        console.log("Fetched Data:", response.data.categoriesWithProducts);
      } catch (error) {
        console.error("Erro ao obter categorias e produtos:", error);
      }
    };

    fetchData();
  }, []);

  // Log relevant variables

  // Log relevant variables
  useEffect(() => {
    console.log("selectedCategory:", selectedCategory);
    console.log("categoriesWithProducts:", categoriesWithProducts);

    if (categoriesWithProducts.length > 0) {
      categoriesWithProducts.forEach((category) => {
        console.log(`Category: ${category.category}`);
        console.log("Subcategories:", category.subcategories);
        console.log("Products:", category.products);
      });
    }
  }, [selectedCategory, categoriesWithProducts]);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category);
  };

  return (
    <div style={{
      marginTop:"10rem"
    }}>
      <Navbar />
      <div>
        <ul>
          <li onClick={() => handleCategoryClick("Todos")}>
            <h2>Todos</h2>
          </li>
          {categoriesWithProducts &&
            categoriesWithProducts.map((category) => (
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
        {categoriesWithProducts &&
          categoriesWithProducts.map((category) => (
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
                {category.subcategories &&
                  category.subcategories.map((subcategory, index) => (
                    <li key={index}>
                      <h3>{subcategory}</h3>
                      <ul>
                        {category.products
                          .filter(
                            (product) =>
                              selectedCategory === "Todos" ||
                              product.category === selectedCategory
                          )
                          .filter(
                            (product) => product.subcategory === subcategory
                          )
                          .map((product) => (
                            <li key={product._id}>
                              <p>R${product.price}</p>
                              <Link
                                key={product._id}
                                to={`/products/${product._id}`}
                                className="product-link"
                              >
                                <img
                                  src={product.variations[0].urls[0]}
                                  alt="Capa do Produto"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "100px",
                                  }}
                                />
                              </Link>{" "}
                              <Link
                                key={product._id}
                                to={`/products/${product._id}`}
                                className="product-link"
                              >
                                <h4>{product.name}</h4>
                              </Link>
                              {}
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
