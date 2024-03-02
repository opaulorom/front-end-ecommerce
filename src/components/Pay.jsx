import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import FreteSelect from "./FreteSelect";
import { useUser } from "@clerk/clerk-react";
const Pay = () => {
  const { user } = useUser();

  useEffect(() => {
    const fetchFrete = async () => {
      try {
        const clerkUserId = user.id;

        // Faz a solicitação GET para obter os dados atualizados do frete
        const responseGet = await axios.get(`http://localhost:3001/api/cart/${clerkUserId}/total-price`);
        setFrete(responseGet.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFrete();
  }, [ user]);
  return (
    <div>
      <Header />
      <Navbar />
      <div style={{marginTop:"15rem"}}>
        <FreteSelect/>
      </div>
    </div>
  );
};

export default Pay;
