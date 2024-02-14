import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BannerWithDiscount = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      const response = await axios.get(`http://localhost:3001/api/bannerByDiscount/70`);
      setBanner(response.data.banners); // Use banners diretamente
    };

    fetchBanner();
  }, []);

  return (
    <div>
      {banner.length > 0 && (
        <img src={banner[0].image} alt={banner[0].title} />
      )}
    </div>
  );
};

export default BannerWithDiscount;
