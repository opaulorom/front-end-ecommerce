// Products.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Products.css";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { searchAtom } from "../Jotai/searchAtom";
import { useAtomValue } from "jotai";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchTerm = useAtomValue(searchAtom);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Current Page:", currentPage);
      console.log("Search Term:", searchTerm);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/products?page=${currentPage}&keyword=${searchTerm}`
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        console.log("TotalPages", response.data.totalPages);
      } catch (error) {
        console.log("Erro ao obter produtos", error);
      } finally {
        setLoading(false); // Desativar loading, independentemente do resultado
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm]);

  const handlePageChange = (event, value) => {
    console.log("New Page:", value);
    setCurrentPage(value || currentPage);
  };
  
  return (
    <div className="productContainer">
      <div>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div>
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="product-link"
              >
                <div className="product-card">
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
            <div
              style={{
                marginBottom: "1rem",
                zIndex: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack spacing={2}>
              <Pagination
  count={totalPages}
  page={currentPage}
  onChange={(event, value) => handlePageChange(event, value)}
  color="primary"
/>


              </Stack>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
