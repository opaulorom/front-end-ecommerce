import { useClerk } from '@clerk/clerk-react';
import { useState } from 'react';

const Favorites = () => {
  const { user } = useClerk();
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (productId) => {
    // Adicione o produto aos favoritos do usuário
    setFavorites((prevFavorites) => [...prevFavorites, productId]);
  };

  const removeFromFavorites = (productId) => {
    // Remova o produto dos favoritos do usuário
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
  };

  return (
    <div>
      <h1>Meus Favoritos</h1>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite}>
            {favorite} - <button onClick={() => removeFromFavorites(favorite)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
