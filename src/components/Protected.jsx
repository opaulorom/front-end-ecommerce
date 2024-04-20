import SignUpForm from './SignUpForm'
import UpdateForm from './UpdateForm'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Protected = () => {
  const [showComponent, setShowComponent] = useState(false);
  const userId = Cookies.get('userId'); // Obtenha o token do cookie

  const token = Cookies.get('token'); // Obtenha o token do cookie

  useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/custumer/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
 
          },
        }
        );
        if (!response.data || response.data.length === 0 ) {
        
          setShowComponent(true)
        } else {
          setShowComponent(false);
   
        }
     
      } catch (error) {
 
        
      }
    };

    checkUserRegistration();
  }, [userId]);

  return (
    <div>
      {showComponent === true ?  <SignUpForm></SignUpForm> :      <UpdateForm></UpdateForm> 
}
       
    </div>
  );
};

export default Protected;
