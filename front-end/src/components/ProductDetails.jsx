import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ColorDot = ({ color, onClick }) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: color,
        display: "inline-block",
        marginRight: "5px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

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

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <img src={product.images[0].url} alt={product.name} />

      <h1>{product.name}</h1>
      <p>{product.price}</p>

      {/* Exibe uma bolinha com a cor do produto */}
      {product.images[0].colors.map((colorObj, index) => (
        <ColorDot
          key={index}
          color={colorObj.color}
          onClick={() => handleColorClick(colorObj.color)}
        />
      ))}

      <p></p>

      {/* Exibe a imagem correspondente à cor selecionada */}
      {selectedColor && (
        <img
          src={
            product.images
              .flatMap((image) => image.colors)
              .find((c) => c.color === selectedColor)?.url
          }
          alt={`${product.name} - ${selectedColor}`}
        />
      )}
    </div>
  );
};

export default ProductDetails;
