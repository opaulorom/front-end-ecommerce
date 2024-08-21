import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useConfig } from '../context/ConfigContext';

const DiscountedProductsPage = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const { apiUrl } = useConfig();

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const response = await axios.get(
         `${apiUrl}/api/discountedProductsBySubcategory?subcategoryName=Vestidos`
        );
        setDiscountedProducts(response.data); // Adjust according to your data structure
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchDiscountedProducts();
  }, []);

  return (
    <div>
      <h1>Discounted Products</h1>
      <ul>
        {discountedProducts.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            hgfhgfh
            {/* Add more information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscountedProductsPage;
