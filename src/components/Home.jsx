import React, { Fragment, useState, useEffect } from "react";
import "../components/Home.css";
import MetaData from "../components/Layout/MetaData";
import Loader from "../components/Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Pagination from "react-js-pagination";
import Product from "../components/product/Product";

import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, [minPrice, maxPrice]));
  }, [dispatch, keyword, currentPage, minPrice, maxPrice]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  // Verifica se products é uma array válida antes de aplicar o filtro
  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      )
    : [];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Melhores variedades de Roupas"}></MetaData>
          <div className="row">
            <div className="colPrice">
              <div className="pxPrice">
                <label>Preço Mínimo:</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <label>Preço Máximo:</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="row">
                {filteredProducts.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div>No products available in the selected price range</div>
            )}
          </div>
          {resPerPage <= productsCount && (
            <div className="flex">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Proximo"}
                prevPageText={"Anterior"}
                firstPageText={"Primeiro"}
                lastPageText={"último"}
                itemClass="page-item"
                linkClass="page-link"
                activeLinkClass="active-page"
                innerClass="pagination-container"
              />
            </div>
          )}
          {error && <div>Error: {error}</div>}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
