import React, { useState, useEffect } from 'react';

const ProductByCategories = () => {
  // Estado para armazenar os dados da categoria, subcategorias e produtos
  const [productsByCategory, setProductsByCategory] = useState([]);
  const categoryId = '658a01244008663057776613'; // Substitua pelo ID real da categoria

  // Efeito para buscar os dados da categoria quando o componente montar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/category/${categoryId}`);
        const data = await response.json();

        if (data.success) {
          setProductsByCategory(data.productsByCategory || []); // Certifique-se de ter uma matriz vazia se os dados estiverem ausentes
        } else {
          console.error('Erro ao obter dados da categoria:', data.message);
        }
      } catch (error) {
        console.error('Erro na solicitação AJAX:', error);
      }
    };

    fetchData();
  }, [categoryId]); // Executa o efeito sempre que categoryId mudar

  return (
    <div>
      {productsByCategory.length > 0 ? (
        productsByCategory.map(categoryData => (
          <div key={categoryData.subcategory?._id}>
            <h2>{categoryData.subcategory?.name}</h2>
            <ul>
              {categoryData.products.map(product => (
                <li key={product._id}>
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                  {product.name} - {product.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Nenhum dado disponível.</p>
      )}
    </div>
  );
};

export default ProductByCategories;
