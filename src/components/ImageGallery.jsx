import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');

        console.log('Categories Response:', response.data);

        // Verifica se a resposta possui a propriedade "categories" e se é um array
        if (response.data.categories && Array.isArray(response.data.categories)) {
          // Flatten todas as imagens de todas as subcategorias
          const flattenedImages = response.data.categories
            .map(category => category.images)
            .flat()
            .map(subcategoryImages => subcategoryImages.map(image => ({ imageUrl: image.imageUrl, _id: image._id })))
            .flat();

          console.log('Flattened Images:', flattenedImages);

          setImages(flattenedImages);
        } else {
          setImages([]);
        }
      } catch (error) {
        setError('Error fetching images');
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated Images:', images);
  }, [images]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Image Gallery</h2>
      <div>
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image) => (
            <div key={image._id}>
              {image.imageUrl ? (
                <img src={image.imageUrl} alt={`Image ${image._id}`} />
              ) : (
                <div>No URL available for image</div>
              )}
            </div>
          ))
        ) : (
          <div>No images available</div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
