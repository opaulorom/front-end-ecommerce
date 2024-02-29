import SignUpForm from './SignUpForm'
import UpdateForm from './UpdateForm'
import React, { useEffect, useState } from 'react';
import { useClerk } from "@clerk/clerk-react";
import axios from 'axios';

const Protected = () => {
  const clerk = useClerk();
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/custumer/${clerk.user.id}`);
        setIsUserRegistered(true);
      } catch (error) {
        setIsUserRegistered(false);
      }
    };

    checkUserRegistration();
  }, [clerk.user]);

  return (
    <div>
      {isUserRegistered ? <UpdateForm /> : <SignUpForm />}

    </div>
  );
};

export default Protected;
