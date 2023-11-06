import React from 'react'
import { io } from 'socket.io-client'
const SOCKET_URL = "https://my-social-media-0yny.onrender.com"


export const socket = io(SOCKET_URL)
export const AppContext = React.createContext()