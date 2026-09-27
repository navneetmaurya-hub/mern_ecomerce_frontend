import React, { useContext } from 'react'
import AppContext from '../context/AppContext.jsx';

const Profile = () => {
    const {user}=useContext(AppContext);
  return (
    <div>
      <h1>User Name={user?.name}</h1>
      <h1>User Email={user?.email}</h1>
    </div>
  )
}

export default Profile;