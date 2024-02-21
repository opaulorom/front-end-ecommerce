import { useState } from "react";
import Heart from "react-heart";
import { useUser } from "@clerk/clerk-react";

const IconToggle = ({ productId, isFavorite }) => {
  const [active, setActive] = useState(isFavorite ?? false);
  const { isSignedIn, user, isLoaded } = useUser();
  const handleClick = async () => {
    try {
      // Verificar se o usuário está autenticado
      if (!isSignedIn || !user || !isLoaded) {
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
          },
          body: JSON.stringify({
            clerkUserId: user.id,
            productId: productId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setActive(!active);
      } else {
        console.error("Erro ao adicionar/remover produto dos favoritos");
      }
    } catch (error) {
      console.error("Erro ao adicionar/remover produto dos favoritos:", error);
    }
  };

  return (
    <div>
      <div style={{ width: "2rem" }}>
        <Heart isActive={active} onClick={handleClick} animationScale={1.25} style={{ marginBottom: '1rem' }} />
      </div>
    </div>
  );
};

export default IconToggle