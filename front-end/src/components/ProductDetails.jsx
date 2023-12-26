import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ColorDot = ({ color }) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: color,
        display: "inline-block",
        marginRight: "5px"
      }}
    />
  );
};

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
    
    {/* Exibe uma bolinha com a cor do produto */}
    {product.images[0].colors.map((color, index) => (
  <ColorDot key={index} color={color.color} />
))}

    
    <p></p>
  </div>
  );
};

export default ProductDetails;
