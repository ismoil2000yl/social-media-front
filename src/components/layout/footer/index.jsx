import React from 'react'
import IconHome from '/src/assets/images/png/home.png'
import IconMessage from '/src/assets/images/png/message.png'
import IconGroup from '/src/assets/images/png/group.png'
import IconSearch from '/src/assets/images/png/search.png'
import IconAccaunt from '/src/assets/images/png/accaunt.png'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const footer = () => {
    const navigate = useNavigate()

    const location = useLocation()

    return (
        <div className='footer'>
            <button
                className={`footer-btn ${location.pathname === "/" ? "active" : ""}`}
                onClick={() => navigate("/")}>
                <img className='footer-btn-img' src={IconHome} alt="" />
            </button>
            <button
                className={`footer-btn ${location.pathname === "/chat" ? "active" : ""}`}
                onClick={() => navigate("/chat")}>
                <img className='footer-btn-img' src={IconMessage} alt="" />
            </button>
            <button
                className={`footer-btn ${location.pathname === "/group" ? "active" : ""}`}
                onClick={() => navigate("/group")}>
                <img className='footer-btn-img' src={IconGroup} alt="" />
            </button>
            <button
                className={`footer-btn ${location.pathname === "/search" ? "active" : ""}`
                } onClick={() => navigate("/search")}>
                <img className='footer-btn-img' src={IconSearch} alt="" />
            </button>
            <button
                className={`footer-btn ${location.pathname === "/accaunt" ? "active" : ""}
            `} onClick={() => navigate("/accaunt")}>
                <img className='footer-btn-img' src={IconAccaunt} alt="" />
            </button>
        </div>
    )
}

export default footer