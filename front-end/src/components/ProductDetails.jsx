import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/product/${productId}`
        );
        setProduct(response.data.product);
        console.log('data', response)
      } catch (error) {
        console.error("Erro ao obter detalhes do produto:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <img src={product.images[0].url} alt={product.name} />

      <h1>{product.name}</h1>
      <p>{product.price}</p>

      {/* Adicione mais detalhes conforme necessário */}
    </div>
  );
};

export default ProductDetails;
