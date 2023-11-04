import React from 'react'
import { useState, useContext } from 'react'
import { AppContext } from '../../context/appContext'
import MyPicture from '/src/assets/images/jpg/my-picture.jpg'
import IconGalochka from '/src/assets/images/png/galochka.png'

const index = () => {

  const { socket, setMembers } = useContext(AppContext)

  socket.off("new-user").on("new-user", (payload) => {
    localStorage.setItem("members", JSON.stringify(payload))
    // setMembers(payload)
  });

  return (
    <div className='home'>
      <div className="home-box">
        <div className="home-box-inbox">
          <img className='home-box-inbox-image' src={MyPicture} alt="" />
          <h1 className='home-box-inbox-name'>
            Ismoiljon Jalolov
          </h1>
          <h3 className='home-box-inbox-username'>
            <span className='galochka'>
              <img src={IconGalochka} alt="" />
            </span>
            @ismoil2000yl
            <span className='galochka'>
              <img src={IconGalochka} alt="" />
            </span>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default index