import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import DiscountImageLinkPerPercentage from "./DiscountImageLinkPerPercentage";
import BannerWithDiscount from "./BannerWithDiscount";
import DiscountImageLinkPerPercentageAndCategory from "./DiscountImageLinkPerPercentageAndCategory";

import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconToggle from "./IconToggle";
const NewArrivals = () => {
    const { query } = useParams();
    const [newArrivals, setNewArrivals] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
   
  
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
    }, [
 
      currentPage,

    ]);
  
    const handlePageChange = (event, page) => {
      setCurrentPage(page);
    };
    
  return (
    <div>
         <Header />
      <Navbar />
      

      <div style={{ marginTop: "10rem" }}>
        <ul>
          {newArrivals.map((product) => (
            <li key={product._id}>
              <Link to={`/products/${product._id}`}>
                <img src={product.variations[0].urls[0]} alt="" />
                {product.name} - {product.price}
              </Link>
            </li>
          ))}
        </ul>

        {/* Paginação */}
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
  )
}

export default NewArrivals