import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const DiscountImageLinkPerPercentage = ({ alt }) => {
  const [imageUrl, setImageUrl] = useState('');

  // Fetch image URL from API on component mount
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bannerByDiscount/50');
        setImageUrl(response.data.banners[0].image); // Assuming you want the first banner
      } catch (error) {
        console.error('Error fetching image URL:', error);
        // Handle error gracefully, e.g., display a placeholder image or error message
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <Link to={`/productsByDiscountPercentage/70`}>
      <img src={imageUrl} alt={alt} />
      fdfdf
    </Link>
  );
};

export default DiscountImageLinkPerPercentage;
