import React, { useState } from 'react';


const IconToggle = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <div>
      {isFavorite ? (
          <img src='https://i.ibb.co/DKmxvXT/heart-3.png' onClick={handleClick} />
          ) : (
          <img src='https://i.ibb.co/h1HfgJs/heart-2.png' onClick={handleClick} />
      )}
    </div>
  );
};

export default IconToggle;
