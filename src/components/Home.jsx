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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || '';
  const categories = [
    "Camisetas Femininas",
    "Camisetas Masculinas",
    "Camisas Masculinas",
    "Camisas Femininas",
    "Vestidos",
    "Roupa Masculinas",
    "Roupa Femininas",
    "Roupas para Menina",
    "Roupas para Menino",
    "Calças",
  ];

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, [minPrice, maxPrice], category));
  }, [dispatch, keyword, currentPage, minPrice, maxPrice, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const applyPriceFilter = (e) => {
    e.preventDefault();
    const min = minPrice !== "" ? parseFloat(minPrice) : null;
    const max = maxPrice !== "" ? parseFloat(maxPrice) : null;
    dispatch(getProducts(keyword, currentPage, [min, max], category));
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          (minPrice === "" || product.price >= parseFloat(minPrice)) &&
          (maxPrice === "" || product.price <= parseFloat(maxPrice)) &&
          (category === "" || product.category === category)
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
                <form onSubmit={(e) => e.preventDefault()}>
                  <label>Preço Mínimo:</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <label>Preço Máximo:</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <button type="button" onClick={applyPriceFilter}>
                    OK
                  </button>
                </form>
              </div>
              <div className="category">
                <h4 className="mb_5">Categorias</h4>
                <ul className="pl_0">
                  {categories.map((categoryItem) => (
                    <li
                      key={categoryItem}
                      style={{
                        cursor: "pointer",
                        listStyleType: 'none',
                        color: category === categoryItem ? 'blue' : 'black',
                      }}
                      onClick={() => handleCategoryChange(categoryItem)}
                    >
                      {categoryItem}
                    </li>
                  ))}
                </ul>
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
