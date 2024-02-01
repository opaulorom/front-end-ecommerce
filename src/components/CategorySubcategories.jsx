import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomPagination from './CustomPagination';

const CategorySubcategories = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [mixedProducts, setMixedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);

  const fetchMixedProducts = async (page, filters) => {
    try {
      const queryString = Object.entries(filters)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      const response = await fetch(
        `http://localhost:3001/api/categories/${category}/mixedProducts?page=${page}&${queryString}`
      );
      const data = await response.json();
      setMixedProducts(data.mixedProducts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Erro ao obter produtos misturados:', error);
    }
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/subcategories/${category}`);
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error('Erro ao obter subcategorias:', error);
      }
    };

    const fetchFilters = async () => {
      try {
        const colorsResponse = await fetch('http://localhost:3001/api/colors');
        const sizesResponse = await fetch('http://localhost:3001/api/sizes');
        const priceRangesResponse = await fetch('http://localhost:3001/api/priceRanges');

        const colorsData = await colorsResponse.json();
        const sizesData = await sizesResponse.json();
        const priceRangesData = await priceRangesResponse.json();

        setColors(colorsData);
        setSizes(sizesData);
        setPriceRanges(priceRangesData);
      } catch (error) {
        console.error('Erro ao obter opções de filtros:', error);
      }
    };

    fetchSubcategories();
    fetchMixedProducts(currentPage, {});
    fetchFilters();
  }, [category, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterClick = (filterType, value) => {
    // Atualizar a URL ou executar outras ações conforme necessário
    const filters = {
      [filterType]: value,
    };

    fetchMixedProducts(1, filters); // Reiniciar a página para a primeira ao aplicar um novo filtro
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

      <h2>Filtros:</h2>
      <div>
        <h3>Cores</h3>
        {colors.map((color, index) => (
          <div key={index} onClick={() => handleFilterClick('color', color)}>
            {color}
          </div>
        ))}
      </div>

      <div>
        <h3>Tamanhos</h3>
        {sizes.map((size, index) => (
          <div key={index} onClick={() => handleFilterClick('size', size)}>
            {size}
          </div>
        ))}
      </div>

      <div>
        <h3>Faixas de Preço</h3>
        {priceRanges.map((range, index) => (
          <div key={index} onClick={() => handleFilterClick('priceRange', range)}>
            {range}
          </div>
        ))}
      </div>

      <h2>Mixed Products of {category}</h2>
      <ul>
      {mixedProducts && mixedProducts.map(product => (
  <li key={product._id || 'undefined'}>
    {product.name} - {product.price}
  </li>
))}

      </ul>

      <CustomPagination totalPages={totalPages} currentPage={currentPage} onChangePage={handlePageChange} />
    </div>
  );
};

export default CategorySubcategories;
