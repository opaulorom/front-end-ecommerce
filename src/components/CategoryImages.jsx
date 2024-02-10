import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryImages = () => {
  const { categoryId } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://serveradmin-whhj.onrender.com/api/category/${categoryId}/images`);
        const data = await response.json();

        if (response.ok) {
          setImages(data.images);
        } else {
          console.error('Erro ao obter imagens:', data.message);
        }
      } catch (error) {
        console.error('Erro ao obter imagens:', error);
      }
    };

    fetchImages();
  }, [categoryId]);

  return (
    <div>
      <h2>Category Images</h2>
      <div>
        {images.map((image) => (
          <img key={image._id} src={image.url} alt={`Image ${image._id}`} style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }} />
        ))}
      </div>
      <Link to="/categories">Back to Categories</Link>
    </div>
  );
};

export default CategoryImages;
