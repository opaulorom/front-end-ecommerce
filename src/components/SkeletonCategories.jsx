import React from "react";
import "./SkeletonCategories.css"; // Arquivo CSS onde você definiu a classe .skeleton

const SkeletonCategories = () => {
  return (
    <>
      <div className="skeletonContainer">
        desktop
        <div className="skeleton"></div>
        <div className="skeleton"></div> 
        <div className="skeleton"></div>{" "}
        <div className="skeleton"></div> 
        <div className="skeleton"></div>{" "}
        <div className="skeleton"></div>
      </div>
    </>
  );
};

export default SkeletonCategories;
