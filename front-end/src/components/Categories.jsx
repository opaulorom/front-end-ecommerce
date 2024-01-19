import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = ({ productId }) => {
  // Lógica para carregar dados específicos do produto do backend
  // ...

  return (
    <div>
      <h2>Product ID: {productId}</h2>
      {/* Renderize os detalhes do produto aqui */}
    </div>
  );
};

const Category = ({ category, subcategory, products, onProductClick }) => {
  return (
    <div>
      <h2>{category}</h2>
      {subcategory && <h3>{subcategory}</h3>}
      {/* Adicione aqui o conteúdo específico da categoria */}
      <ul>
        {products.map((product) => (
          <li key={product._id} onClick={() => onProductClick(product._id)}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/allCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedSubcategory(null);
    setSelectedProductId(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory);
    setSelectedProductId(null);
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId === selectedProductId ? null : productId);
  };

  return (
    <div style={{ marginTop: '10rem' }}>
      <h2>All Categories</h2>
      {categories.map((categoryGroup, index) => (
        <div key={index}>
          <h3 onClick={() => handleCategoryClick(categoryGroup.category)}>
            {categoryGroup.category}
          </h3>
          // ...

{selectedCategory === categoryGroup.category && (
  <ul>
    {Array.isArray(categoryGroup.subcategory) &&
      categoryGroup.subcategory.map((subcategory, subIndex) => (
        <li key={subIndex} onClick={() => handleSubcategoryClick(subcategory)}>
          {subcategory}
        </li>
      ))}
    {categoryGroup.products
      .filter((product) => !product.subcategory)
      .map((product) => (
        <li key={product._id} onClick={() => handleProductClick(product._id)}>
          {product.name} - {product.price}
        </li>
      ))}
  </ul>
)}

// ...

        </div>
      ))}
      {selectedProductId && <Product productId={selectedProductId} />}
      {selectedSubcategory && (
        <Category
          category={selectedCategory}
          subcategory={selectedSubcategory}
          products={categories
            .find((categoryGroup) => categoryGroup.category === selectedCategory)
            .products.filter((product) => product.subcategory === selectedSubcategory)}
          onProductClick={handleProductClick}
        />
      )}
    </div>
  );
};

export default Categories;
