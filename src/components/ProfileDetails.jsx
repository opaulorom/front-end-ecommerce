import React from 'react'
import Home from './Home'
import Protected from './Protected'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import { logPageView } from '../../analytics'

const ProfileDetails = () => {
  const location = useLocation();
  useEffect(() => {
    logPageView();
  }, [location]);
  return (
    <div>
        <Header></Header>
    </div>
  )
}

export default ProfileDetails