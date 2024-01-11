import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Products.css";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/products?page=${currentPage}`
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        console.log("TotalPages", response.data.totalPages);
      } catch (error) {
        console.log("Erro ao obter produtos", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div>
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/products/${product._id}`}
          className="product-link"
        >
          <div className="product-card">
            {/* Verifica se 'variations' existe e tem pelo menos uma variação e uma URL */}
            {product.variations &&
              product.variations.length > 0 &&
              product.variations[0].urls &&
              product.variations[0].urls.length > 0 && (
                <img
                  className="image"
                  src={product.variations[0].urls[0]}
                  alt=""
                />
              )}
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            {/* Certifica-se de que 'product.variations[0].color' está definido antes de acessá-lo */}
            {product.variations && product.variations.length > 0 && (
              <div
                style={{
                  backgroundColor: product.variations[0].color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              ></div>
            )}
          </div>
        </Link>
      ))}
      <ReactPaginate
        pageCount={totalPages || 1} // Use um valor padrão caso totalPages seja undefined
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        previousLabel="Anterior"
        nextLabel="Próxima"
        breakLabel="..."
        activeClassName="active"
      />
    </div>
  );
};

export default Products;
