import React, { Fragment, useState, useEffect } from "react";
import "../components/Home.css";
import MetaData from "../components/Layout/MetaData";
import Loader from "../components/Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Pagination from "react-js-pagination";
import Product from "../components/product/Product";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  // Usando useSearchParams para acessar os parâmetros da URL
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const minPrice = searchParams.get("price[gte]") || "";
  const maxPrice = searchParams.get("price[lte]") || "";

  useEffect(() => {
    console.log("Keyword:", keyword);
    console.log("Current Page:", currentPage);
    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);

    // Dispatch da ação getProducts com os parâmetros necessários
    dispatch(getProducts({ keyword, currentPage, minPrice, maxPrice }));
  }, [dispatch, keyword, currentPage, minPrice, maxPrice]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Melhores variedades de Roupas"} />
          <div className="row">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <div className="col-12 text-center mt-5">
                <h2>Nenhum produto disponível</h2>
              </div>
            )}
          </div>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Próximo"}
                prevPageText={"Anterior"}
                firstPageText={"Primeiro"}
                lastPageText={"Último"}
                itemClass="page-item"
                linkClass="page-link"
                activeLinkClass="active-page"
                innerClass="pagination-container"
              />
            </div>
          )}
          {error && (
            <div className="col-12 text-center mt-5">
              <h2>Error: {error}</h2>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;