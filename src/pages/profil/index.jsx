import React from 'react'
import { useLogoutUserMutation } from '../../services/appApi';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const index = () => {

  const user = useSelector(state => state.user)

  const [logoutUser, { isLoading, error }] = useLogoutUserMutation()

  const handleLogout = async () => {
    await logoutUser(user)
    // window.location.replace('/');
  }

  return (
    <div className='profil'>
      <div className="profil-box">
        <h3 className='profil-box-title'>
          My Accaunt
          <hr />
        </h3>
        <div className="profil-box-info">
          <div className="profil-box-info-img">
            <img src={user?.picture} alt="" />
          </div>
          <h2 className="profil-box-info-username">
            {user?.username}
          </h2>
          <h4 className="profil-box-info-username">
            {user?.fullname}
          </h4>
          <button onClick={handleLogout} className='profil-box-info-logout'>Log Out</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default index