import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const DiscountImageLinkPerPercentageAndCategory = ({ alt }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl15, setImageUrl15] = useState('');

  const { discount } = useParams();

  useEffect(() => {
    const fetchImageUrl = async (percentage) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/bannerByDiscount/${percentage}`);
        return response.data.banners[0].image; // Assuming you want the first banner
      } catch (error) {
        console.error(`Error fetching image URL for discount ${percentage}:`, error);
        // Handle error gracefully, e.g., display a placeholder image or error message
        return ''; // Return an empty string or a placeholder image URL
      }
    };

    const fetchData = async () => {
      const image50 = await fetchImageUrl(50);
      const image15 = await fetchImageUrl(15);

      setImageUrl(image50);
      setImageUrl15(image15);
    };

    fetchData();
  }, []);

  return (
    <>
      <Link to={`/products/discount/50/category/Feminina`}>
        <img src={imageUrl} alt={alt} />
      </Link>
      <Link to={`/products/discount/15/category/Feminina`}>
        <img src={imageUrl15} alt={alt} />
      </Link>
    </>
  );
};

export default DiscountImageLinkPerPercentageAndCategory;
