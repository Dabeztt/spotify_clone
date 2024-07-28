import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Library from '../library/library.js'
import Feed from '../feed/feed.js'
import Trending from '../trending/trending.js'
import Player from '../player/player.js'
import Favorites from '../favorites/favorites.js'
import '../home/home.css'
import Sidebar from '../../components/sidebar/index.js'
import Login from '../auth/login.js'
import { setClientToken } from '../../nhaccuatui.js'

export default function Home() {
    const [token, setToken] = useState("")

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        const hash = window.location.hash
        window.location.hash = ""
        if (!token && hash) {
            const _token = hash.split("&")[0].split("=")[1]
            window.localStorage.setItem("token", _token)
            setToken(_token)
            setClientToken(_token)
        } else {
            setToken(token)
            setClientToken(token)
        }
    }, [])
    return !token ? (
        <Login />
    ) : (
        <Router>
            <div className='main-body'>
                <Sidebar />
                <Routes>
                    <Route path='/' element={<Library />} />
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/trending' element={<Trending />} />
                    <Route path='/player' element={<Player />} />
                    <Route path='/favorites' element={<Favorites />} />
                </Routes>
            </div>
        </Router>
    )
}
