import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const DiscountImageLink = ({ imageUrl, alt }) => (
  <Link to={`/productsByDiscountPercentage/70`}>
    <img src={imageUrl} alt={alt} />
    fdfdf
  </Link>
);

export default DiscountImageLink;
