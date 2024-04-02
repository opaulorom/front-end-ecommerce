import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Heart from "react-heart";
import {useAuth} from "../context/AuthContext"
const IconToggle = ({ productId, isFavorite }) => {
  const [active, setActive] = useState(isFavorite ?? false);
  const userId = Cookies.get('userId'); // Obtenha o token do cookie
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie

  const token = Cookies.get('token'); // Obtenha o token do cookie
  useEffect(() => {
    setActive(isFavorite);
  }, [isFavorite]);

  const handleClick = async () => {
    try {
      // Verificar se o usuário está autenticado
      if (!loggedIn || !userId ) {
        console.error('Usuário não autenticado.');
        return;
      }

      // Enviar uma requisição POST para adicionar/remover o produto dos favoritos
      const response = await fetch(
        `http://localhost:3001/api/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
          body: JSON.stringify({
            custumerId: userId,
            productId: productId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setActive(!active); // Alterar o estado active para o oposto do valor atual
        localStorage.setItem(`favorite_${productId}`, !active);
      } else {
        console.error("Erro ao adicionar/remover produto dos favoritos");
      }
    } catch (error) {
      console.error("Erro ao adicionar/remover produto dos favoritos:", error);
    }
  };

  useEffect(() => {
    const storedActive = localStorage.getItem(`favorite_${productId}`);
    if (storedActive !== null) {
      setActive(storedActive === "true");
    }
  }, [productId]);

  return (
    <div>
      <div style={{ width: "2rem"}}>
        <Heart
          isActive={active}
          onClick={handleClick}
          animationScale={1.25}
          inactiveColor="#ccc" // Cor cinza quando inativo
          activeColor="red" // Cor vermelha quando ativo
          style={{ marginBottom: '1rem', Zindex: "99999" }}
        />
      </div>
    </div>
  );
};

export default IconToggle;
