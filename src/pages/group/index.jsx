import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNotifications, resetNotifications } from '/src/features/userSlice'
import { AppContext } from '../../context/appContext'

const index = () => {

  // const [rooms, setRooms] = useState([])
  const user = useSelector((state) => state.user)
  const { socket, setCurrentRoom, rooms, setRooms, currentRoom, setPrivateMemberMsg } = useContext(AppContext)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getRooms = () => {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
  }

  const joinRoom = (room, isPublic = true) => {
    socket.emit("join-room", room)
    setCurrentRoom(room)

    if (isPublic) {
      setPrivateMemberMsg(null)
    }

    dispatch(resetNotifications(room))

  }

  socket.off('notifications').on('notifications', (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room))
  })

  useEffect(() => {
    if (user) {
      // setCurrentRoom("general")
      getRooms()
      // socket.emit("join-room", "general")
      socket.emit("new-user")
    }
  }, [])

  return (
    <div className='group'>
      <div className="group-title">
        <h1>Group <span> Chat</span></h1>
      </div>
      <hr />
      <div className="group-box">
        {
          rooms && rooms.map((room, idx) => {
            return (
              <div
                className="group-box-item"
                key={idx}
                onClick={() => { navigate("/group-message"), joinRoom(room) }}
              >
                <h3 className="group-box-item-name">
                  {room} {currentRoom !== room ? <span className='badge'>{user.newMessages[room]}</span> : null}
                </h3>
              </div>
            )
          })
        }
      </div>
    </div >
  )
}

export default index