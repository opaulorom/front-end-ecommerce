import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const ImageGallery = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriesPerPage] = useState(6);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');
        console.log('Categories Response:', response.data);

        if (response.data.categories && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        setError(`Error fetching categories: ${error.message}`);
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const nextPage = () => {
    const nextIndex = currentPage + 1;
    if (nextIndex * categoriesPerPage < categories.length) {
      setCurrentPage(nextIndex);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * categoriesPerPage;
  const endIndex = Math.min(startIndex + categoriesPerPage, categories.length);

  const isBackDisabled = currentPage === 0;
  const isForwardDisabled = endIndex >= categories.length;

  return (
    <div style={{ position: 'relative' }}>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', marginTop:"-10rem" }}>
        {categories.slice(startIndex, endIndex).map((category, index) => (
          <div key={index} style={{ width: '150px', height: '150px', margin: '10px', textAlign: 'center' }}>
            {category.images.map((subcategoryImages, index) => (
              subcategoryImages.map(image => (
                <div key={image._id}>
                  <Link to={`/categories/${encodeURIComponent(category.name)}`}>
                    <img src={image.imageUrl} alt={`Image ${image._id}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "50%", aspectRatio: "1/1" }} />
                  </Link>
                  <span style={{ marginTop: '5px', fontFamily:"poppins", fontWeight:"400", fontSize:".9rem", color:"#666" }}>{category.name}</span>
                </div>
              ))
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)' }}>
        <ArrowBackIosNewRoundedIcon onClick={prevPage} disabled={isBackDisabled} style={{ fontSize: '2.5rem', cursor: 'pointer', color: isBackDisabled ? "rgb(189, 189, 189)" : "" }} />
      </div>
      <div style={{ position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)' }}>
        <ArrowForwardIosRoundedIcon onClick={nextPage} disabled={isForwardDisabled} style={{ fontSize: '2.5rem', cursor: 'pointer', color: isForwardDisabled ? "rgb(189, 189, 189)" : "" }} />
      </div>
    </div>
  );
};

export default ImageGallery;
