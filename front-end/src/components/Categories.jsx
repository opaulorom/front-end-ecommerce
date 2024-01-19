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
  const [uniqueCategoryNames, setUniqueCategoryNames] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/allCategories');
        setCategories(response.data);
        // Extrai os nomes únicos das categorias
        const uniqueNames = new Set(response.data.map((categoryGroup) => categoryGroup.category));
        setUniqueCategoryNames(uniqueNames);
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
      {Array.from(uniqueCategoryNames).map((category, index) => (
        <div key={index}>
          <h3 onClick={() => handleCategoryClick(category)}>{category}</h3>
          {selectedCategory === category && (
            <ul>
              {categories
                .filter((categoryGroup) => categoryGroup.category === category)
                .map((categoryGroup) => (
                  <React.Fragment key={categoryGroup.category}>
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
                  </React.Fragment>
                ))}
            </ul>
          )}
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