import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import FreteSelect from "./Frete";
const Pay = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div style={{marginTop:"15rem"}}>
        <FreteSelect/>
      </div>
    </div>
  );
};

export default Pay;
