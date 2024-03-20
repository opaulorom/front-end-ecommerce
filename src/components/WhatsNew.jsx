import React from "react";
import DiscountImageLinkPerPercentage from "./DiscountImageLinkPerPercentage";
import BannerWithDiscount from "./BannerWithDiscount";
import DiscountImageLinkPerPercentageAndCategory from "./DiscountImageLinkPerPercentageAndCategory";
import Header from "./Header";
import Navbar from "./Navbar";
import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconToggle from "./IconToggle";

const WhatsNew = () => {
  

  return (
    <div>
      <Header />
      <Navbar />
      <h1 style={{ marginTop: "10rem" }}>Promoções</h1>
      <div style={{ display: "flex", marginTop: "5rem" }}>
        <DiscountImageLinkPerPercentage />
      </div>
      <BannerWithDiscount />
      <DiscountImageLinkPerPercentageAndCategory />



    </div>
  );
};

export default WhatsNew;
