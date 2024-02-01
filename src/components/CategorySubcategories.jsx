import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomPagination from './CustomPagination';
const CategorySubcategories = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [mixedProducts, setMixedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMixedProducts = async (page) => {
      try {
        const response = await fetch(`http://localhost:3001/api/categories/${category}/mixedProducts?page=${page}`);
        const data = await response.json();
        setMixedProducts(data.mixedProducts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Erro ao obter produtos misturados:', error);
      }

    
    };

    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/subcategories/${category}`);
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error('Erro ao obter subcategorias:', error);
      }
    };

    fetchSubcategories();
    fetchMixedProducts(currentPage);
  }, [category, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
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

<h2>Mixed Products of {category}</h2>
<ul>
  {mixedProducts.map(product => (
    <li key={product._id || 'undefined'}>
      {product.name} - {product.price}
    </li>
  ))}
</ul>

      <CustomPagination totalPages={totalPages} currentPage={currentPage} onChangePage={handlePageChange}  />
    </div>
  );
};

export default CategorySubcategories;
