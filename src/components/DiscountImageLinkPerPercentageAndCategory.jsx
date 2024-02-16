import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const DiscountImageLinkPerPercentageAndCategory = ({ alt }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrl15, setImageUrl15] = useState('');
    const [imageUrl70, setImageUrl70] = useState('');

    // Fetch image URL from API on component mount
    useEffect(() => {
      const fetchImageUrl = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/sliderByDiscount/50');
          setImageUrl(response.data.sliders[0].image); // Assuming you want the first banner
        } catch (error) {
          console.error('Error fetching image URL:', error);
          // Handle error gracefully, e.g., display a placeholder image or error message
        }
      };
  
      fetchImageUrl();
    }, []);
    // Fetch image URL from API on component mount
    useEffect(() => {
      const fetchImageUrl = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/sliderByDiscount/15');
          setImageUrl15(response.data.sliders[0].image); // Assuming you want the first banner
        } catch (error) {
          console.error('Error fetching image URL:', error);
          // Handle error gracefully, e.g., display a placeholder image or error message
        }
      };
  
      fetchImageUrl();
    }, []);

    useEffect(() => {
      const fetchImageUrl = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/sliderByDiscount/70');
          setImageUrl70(response.data.sliders[0].image); // Assuming you want the first banner
        } catch (error) {
          console.error('Error fetching image URL:', error);
          // Handle error gracefully, e.g., display a placeholder image or error message
        }
      };
  
      fetchImageUrl();
    }, []);
    
  return (
    <>
      <Link to={`/products/discount/50/category/Feminina`}>
        <img src={imageUrl} alt={alt} />
      </Link>
      <Link to={`/products/discount/15/category/Feminina`}>
        <img src={imageUrl15} alt={alt} />
      </Link>
      
      <Link to={`/products/discount/70/category/Feminina`}>
        <img src={imageUrl70} alt={alt} />
      </Link>
    </>
  );
};

export default DiscountImageLinkPerPercentageAndCategory;
