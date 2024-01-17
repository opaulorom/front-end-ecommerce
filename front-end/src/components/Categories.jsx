import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');

        const data = response.data.categories;
        console.log(response.data);
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!Array.isArray(categories)) {
    return <div>Erro: Os dados não estão no formato esperado.</div>;
  }

  return (
    <div style={{ marginTop: "15rem" }}>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
