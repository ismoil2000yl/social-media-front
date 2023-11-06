import { useContext, useState } from 'react'
import IconX from '/src/assets/images/png/xicon.png'
import IconAccaunt from '/src/assets/images/png/image.jpg'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AppContext } from '../../context/appContext'

const index = () => {

  const [value, setValue] = useState("")
  const navigate = useNavigate()
  const { members } = useContext(AppContext)

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = localStorage.getItem("members")
    setUsers(JSON.parse(getUsers))
  }, [])
  return (
    <div className='search'>
      <label htmlFor="search" className='search-label'>
        <input placeholder='Search...' value={value} className='search-label-input' type="text" id='search' onChange={(e) => setValue(e.target.value)} />
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
          {users ?
            users.filter(item => item.username.toLowerCase().includes(value.toLowerCase())).map(item => {
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