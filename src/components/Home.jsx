import React, { Fragment, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MetaData from "../components/Layout/MetaData";
import Loader from "../components/Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Pagination from "react-js-pagination";
import Product from "../components/product/Product";
import "../components/Home.css"
const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  // Usando useSearchParams para acessar os parâmetros da URL
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    console.log("Keyword:", keyword);
    console.log("Current Page:", currentPage);
    dispatch(getProducts(keyword, currentPage));
    // Se necessário, você pode passar a palavra-chave para a sua ação getProducts
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, keyword, currentPage])

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
            {products && products.length > 0 ? (
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
