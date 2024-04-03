import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/new-arrivals?page=${currentPage}`
        );
        const data = await response.json();
        console.log("Data from server:", data);
        setNewArrivals(data.newArrivals);
        setTotalProducts(data.totalProducts);
      } catch (error) {
        console.error("Erro ao buscar resultados de pesquisa:", error);
      }
    };

    fetchSearchResults();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (loggedIn) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  });
  return (
    <div>
      <Header />
      <Navbar />

      <div style={{ marginTop: "10rem" }}>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            flexDirection: "column",
          }}
        >
          {newArrivals.map((product) => (
            <li key={product._id}>
              <Link
                to={`/products/${product._id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "2rem",
                  alignItems: "center",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {product.variations &&
                  product.variations[0] &&
                  product.variations[0].urls && (
                    <img
                      src={product.variations[0].urls[0]}
                      alt=""
                      style={{ width: "15vw" }}
                    />
                  )}

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      fontFamily: "poppins, sans-serif",
                    }}
                  >
                    R$ {product.price}
                  </span>

                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "15vw",
                      color: "rgb(114, 114, 114)",
                      fontSize: ".8rem",
                    }}
                  >
                    {product.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(totalProducts / 10)}
              variant="outlined"
              color="primary"
              size="large"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </div>
      {showButton && (
        <div className="button" onClick={logout}>
          <LogoutIcon />
          <span>Sair</span>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
