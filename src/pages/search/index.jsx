import { useContext, useEffect, useState } from 'react'
import IconX from '/src/assets/images/png/xicon.png'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/appContext'
import IconAccaunt from '/src/assets/images/png/image.jpg'
import axios from 'axios'

const index = () => {

  const { socket, setMembers } = useContext(AppContext)

  socket.off("new-user").on("new-user", (payload) => {
    console.log(payload)
    setMembers(payload)
  });

  const getMembers = async () => {
    const data = await axios.get("https://my-social-media-0yny.onrender.com/users/users")
    setMembers(data?.data)
  }

  useEffect(() => {
    getMembers()
  }, [])

  const [value, setValue] = useState("")
  const navigate = useNavigate()
  const { members } = useContext(AppContext)
  return (
    <div className='search'>
      <label htmlFor="search" className='search-label'>
        <input placeholder='Search...' defaultValue={""} value={value} className='search-label-input' type="text" id='search' onChange={(e) => setValue(e.target.value)} />
        <button className='search-label-x' onClick={() => setValue("")}>
          <img src={IconX} className="search-label-x-img" alt="" />
        </button>
      </label>
      <div className="search-result">
        <h5 className="search-result-title">Result</h5>
        <hr />
      </div>
      <div className="search-box">
        <div className="search-box-inbox">
          {members ?
            members.filter(item => item.username.toLowerCase().includes(value.toLowerCase())).map(item => {
              return (
                <div key={item?._id} className="search-box-inbox-item" onClick={() => navigate("/message")}>
                  <div className="search-box-inbox-item-img">
                    <img src={item?.picture} alt="" />
                    <span className='online'></span>
                  </div>
                  <h3 className='search-box-inbox-item-username'>{item?.username}</h3>
                  <h6 className='search-box-inbox-item-online'>Online</h6>
                </div>
              )
            }) : null
          }
        </div>
      </div>
    </div>
  )
}

export default index