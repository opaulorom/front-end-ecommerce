import React, { Fragment, useState, useEffect } from "react";
import "../components/Home.css";
import MetaData from "../components/Layout/MetaData";
import Loader from "../components/Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Pagination from "react-js-pagination";
import Product from "../components/product/Product";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useSearchParams } from "react-router-dom";

const { createSliderWithTooltip } = Slider;

const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  // Usando useSearchParams para acessar os parâmetros da URL
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    // Se necessário, você pode passar a palavra-chave para a sua ação getProducts
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Melhores variedades de Roupas"}></MetaData>
          <div className="row">
            {keyword ? (
              <Fragment>
                <div className="colPrice">
                  <div className="pxPrice">
                    <Range
                      marks={{
                        1: `R$1`,
                        1000: `R$1000`,
                      }}
                      min={1}
                      max={1000}
                      defaultValue={[1, 100]}
                      tipFormmeter={(value) => `R$${value}`}
                      tipProps={{
                        placement: "top",
                        visible: true,
                      }}
                      value={price}
                      onChange={(price) => setPrice(price)}
                    />
                  </div>
                </div>
                <div className="SencondColumn">
                  <div className="row">
                    {products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              </Fragment>
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <div>No products available</div>
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
