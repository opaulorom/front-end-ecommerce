import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ImageGallery = () => {
  const [categories, setCategories] = useState([]);
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

 // ...// ...
// ...
// ...// ...

const handleImageClick = async (categoryName, subcategoryName) => {
    console.log('Clicked on image. Redirecting to category subcategories:', categoryName, subcategoryName);
  
    try {
      const response = await axios.get(`http://localhost:3001/api/subcategories/${categoryName}`);
      const subcategories = response.data;
  
      console.log('Fetched subcategories:', subcategories);
  
      if (subcategories && subcategories.length > 0) {
        console.log('Navigating to category subcategories:', categoryName);
        navigate(`/categories/${encodeURIComponent(categoryName)}/subcategories`);
      } else {
        console.log('No subcategories found. Redirecting to category products:', categoryName, subcategoryName);
        navigate(`/categories/${encodeURIComponent(categoryName)}/${encodeURIComponent(subcategoryName)}/products`);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      // Se ocorrer um erro ou não houver subcategorias, redirecione para a página de produtos
      navigate(`/categories/${encodeURIComponent(categoryName)}/${encodeURIComponent(subcategoryName)}/products`);
    }
  };
  
  // ...
  
  
  // ...
  
  // ...
  
  
  return (
    <div>
      <h2>Image Gallery</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.flatMap(category => category.images.flatMap(subcategoryImages => (
            subcategoryImages.map(image => (
              <div key={image._id} style={{ width: '150px', height: '150px' }}>
                {image.imageUrl ? (
                  <div onClick={() => handleImageClick(category.name)}>
                    {/* Adicione subcategoryName como segundo argumento */}
                    <img src={image.imageUrl} alt={`Image ${image._id}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div>No URL available for image</div>
                )}
              </div>
            ))
          )))
        ) : (
          <div>No images available</div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
