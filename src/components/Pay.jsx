import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import FreteComponent from "./FreteComponent";
const Pay = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div style={{marginTop:"15rem"}}>
        <FreteComponent/>
      </div>
    </div>
  );
};

export default Pay;
