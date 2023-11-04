import React from 'react'
import { useLogoutUserMutation } from '../../services/appApi';
import { useSelector } from 'react-redux'

const index = () => {

  const item = useSelector(state => state.user)

  const [logoutUser, { isLoading, error }] = useLogoutUserMutation()

  const handleLogout = async () => {
    await logoutUser(item)
    window.location.replace('/');
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
            <img src={item?.picture} alt="" />
          </div>
          <h2 className="profil-box-info-username">
            {item?.username}
          </h2>
          <h4 className="profil-box-info-username">
            {item?.fullname}
          </h4>
          <button onClick={handleLogout} className='profil-box-info-logout'>Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default index