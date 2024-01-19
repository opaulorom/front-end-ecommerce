import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/allCategories'); // Substitua pela rota correta do seu backend
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    // Lógica para redirecionar para a página da categoria específica
    console.log(`Redirect to category: ${category}`);
  };

  const handleSubcategoryClick = (subcategory) => {
    // Lógica para redirecionar para a página da subcategoria específica
    console.log(`Redirect to subcategory: ${subcategory}`);
  };

  const uniqueCategories = {};

  categories.forEach((categoryGroup) => {
    const { category, subcategory, products } = categoryGroup;
  
    // Adiciona a categoria principal
    if (!uniqueCategories[category]) {
      uniqueCategories[category] = {
        subcategories: [],
        products: [],
      };
    }
  
    // Adiciona subcategorias
    if (subcategory && !uniqueCategories[category].subcategories.includes(subcategory)) {
      uniqueCategories[category].subcategories.push(subcategory);
    }
  
    // Adiciona produtos
    uniqueCategories[category].products = [...uniqueCategories[category].products, ...products];
  });
  
  return (
    <div style={{marginTop:"10rem"}}>
      <h2>All Categories</h2>
      {Object.keys(uniqueCategories).map((category, index) => (
        <div key={index}>
          <h3 onClick={() => handleCategoryClick(category)}>{category}</h3>
          <ul>
            {uniqueCategories[category].subcategories.map((subcategory) => (
              <li key={subcategory} onClick={() => handleSubcategoryClick(subcategory)}>
                {subcategory}
                <ul>
                  {uniqueCategories[category].products
                    .filter((product) => product.subcategory === subcategory)
                    .map((product) => (
                      <li key={product._id}>
                        {product.name} - {product.price}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
            {uniqueCategories[category].products
              .filter((product) => !product.subcategory)
              .map((product) => (
                <li key={product._id}>
                  {product.name} - {product.price}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Categories;
