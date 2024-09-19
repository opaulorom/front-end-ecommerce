import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import styles from "./Categories.module.css";
import { useConfig } from "../context/ConfigContext";
import { logPageView } from "../../analytics";
import { Helmet } from "react-helmet";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { apiUrl } = useConfig();
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/allCategories`);
        const data = await response.json();

        setCategories((prevCategories) => {
          // Use um conjunto temporário para armazenar categorias únicas
          const uniqueCategoriesSet = new Set([
            ...prevCategories.map((c) => c.category),
            ...data.map((c) => c.category),
          ]);
          const uniqueCategories = Array.from(uniqueCategoriesSet).map(
            (category) => ({ category })
          );

          return uniqueCategories;
        });
      } catch (error) {
        console.error("Erro ao obter categorias:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        marginTop: "15rem",
        marginBottom: "10rem",
      }}
      className={styles.ImageGallery}
    >
      
      <Helmet>
        <title>Categorias - Loja Mediewal</title>
        <meta
          name="description"
          content="Veja as últimas novidades em nossa loja, com uma seleção de produtos novos."
        />
      </Helmet>
      <ImageGallery />
    </div>
  );
};

export default Categories;
