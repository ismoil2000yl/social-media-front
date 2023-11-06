import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext, socket } from '../../context/appContext'
import IconX from '/src/assets/images/png/xicon.png'
import { useNavigate } from 'react-router-dom'
import { addNotifications, resetNotifications } from '/src/features/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const index = () => {

  const [value, setValue] = useState("")
  const user = useSelector(state => state.user)
  const { socket, setPrivateMemberMsg, setCurrentRoom, currentRoom } = useContext(AppContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = localStorage.getItem("members")
    setUsers(JSON.parse(getUsers))
  }, [])

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

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2
    }
    else {
      return id2 + "-" + id1
    }
  }

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member)
    const roomId = orderIds(user._id, member._id)
    joinRoom(roomId, false)
    navigate("/message")
  }

  return (
    <div className='search'>
      <label htmlFor="search" className='search-label'>
        <input placeholder='Search...' value={value} className='search-label-input' type="text" id='search' onChange={(e) => setValue(e.target.value)} />
        <button className='search-label-x' onClick={() => setValue("")}>
          <img src={IconX} className="search-label-x-img" alt="" />
        </button>
      </label>
      <div className="search-result">
        <h5 className="search-result-title">Chats</h5>
        <hr />
      </div>
      <div className="search-box">
        <div className="search-box-inbox">
          {users ?
            users.filter(member => member.fullname.toLowerCase().includes(value.toLowerCase())).map(member => {
              return (
                <div div key={member.id} className="search-box-inbox-item" onClick={() => handlePrivateMemberMsg(member)}>
                  <div className="search-box-inbox-item-img">
                    <img src={member?.picture} alt="" />
                    <span className={`${member.status === "Online" ? 'online' : "offline"}`}></span>
                  </div>
                  <h3 className='search-box-inbox-item-username'>{member?.fullname}</h3>
                  <h6 className='search-box-inbox-item-online'>
                    {currentRoom !== member ? <span className='badge'>{user.newMessages[orderIds(member?._id, user?._id)]}</span> : null}
                  </h6>
                </div >
              )
            }) : null
          }
        </div>
      </div>
    </div>
  )
}

export default index