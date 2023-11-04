import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/appContext'
import { useSelector } from 'react-redux'
import IconFile from '/src/assets/images/png/file.png'
import IconSend from '/src/assets/images/png/send.png'
import IconUser from '/src/assets/images/png/image.jpg'
import ImgSend from '/src/assets/images/jpg/page-not-found.jpg'
import ImgGet from '/src/assets/images/jpg/background-login.jpg'

const index = () => {

    const [message, setMessage] = useState("")
    // const [messages, setMessages] = useState([])
    const user = useSelector(state => state.user)
    const { socket, currentRoom, setMessages, messages } = useContext(AppContext)
    const messageEndRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    const todayDate = getFormattedDate()

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });
    function handleSubmit(e) {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");
    }

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className='msg'>
            <div className="msg-box">
                {
                    messages.map(({ _id: date, messagesByDate }, idx) => {
                        return (
                            <div key={idx}>
                                <h4 className='t-c'>{date}</h4>
                                {
                                    messagesByDate.map(({ content, time, from: sender }, msgIdx) => {
                                        return (
                                            <>
                                                <div key={msgIdx} className={`msg-box-item-${sender.username === user.username ? "me" : "you"}`}>
                                                    <div className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-info`}>
                                                        <p className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-info-text`}>{content}</p>
                                                        {/* {
                                                            item?.image ?
                                                                <div className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-info-img`}>
                                                                    <img src={item?.image} alt="" />
                                                                </div>
                                                                : null
                                                        } */}
                                                        <span className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-info-data`}>
                                                            {time}
                                                        </span>
                                                    </div>
                                                    <div className={`msg-box-item-${sender.username === user.username ? "me" : "you"}-img`}>
                                                        <img src={sender.picture} alt="" />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <div ref={messageEndRef} />
            </div>
            <div className="msg-group">
                <div className="msg-group-file">
                    <button className='msg-group-file-item'>
                        <img src={IconFile} alt="" />
                    </button>
                </div>
                <div className="msg-group-text">
                    <textarea
                        className='msg-group-text-item'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(event) => {
                            event.key === "Enter" && handleSubmit();
                        }}
                    />
                </div>
                <div className="msg-group-btn">
                    <button className='msg-group-btn-item' onClick={handleSubmit}>
                        <img src={IconSend} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default index