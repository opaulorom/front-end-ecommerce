// Subcategory.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Subcategory = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/subcategoriesAndProducts/${category}/${subcategory}`
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter produtos da subcategoria:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div>
      <h1>{subcategory} Products</h1>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          listStyleType: "none",
        }}
      >
        {products.map((product) => (
          <Link to={`/products/${product._id}`}>
            <li key={product._id}>
              <img
                src={product.variations[0].urls[0]}
                alt={product.name}
                style={{ width: "20svw" }}
              />
               <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{product.name}</span>
              <span>{Number(product.price).toFixed(2).padStart(5, "0")}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Subcategory;
