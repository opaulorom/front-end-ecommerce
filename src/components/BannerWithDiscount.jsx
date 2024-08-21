import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import { useConfig } from '../context/ConfigContext';

const BannerWithDiscount = () => {
  const [banner, setBanner] = useState([]);
  const { apiUrl } = useConfig();

  useEffect(() => {
    const fetchBanner = async () => {
      const response = await axios.get(`${apiUrl}/api/bannerByDiscount/70`);
      setBanner(response.data.banners);
    };

    fetchBanner();
  }, []);

  return (
    <div>
      {banner.length > 0 && (
        // Use o Link do react-router-dom ao redor da imagem
        <Link to="/produtos/vestidos">
          <img src={banner[0].image} alt={banner[0].title} />
        </Link>
      )}
    </div>
  );
};

export default BannerWithDiscount;
