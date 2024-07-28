import React, { useEffect, useState } from 'react'
import '../sidebar/sidebar.css'
import SidebarButton from './sidebarButton.js'
import { MdFavorite, MdSpaceDashboard } from 'react-icons/md'
import { FaGripfire, FaPlay, FaSignOutAlt } from 'react-icons/fa'
import { IoLibrary } from 'react-icons/io5'
import apiClient from '../../nhaccuatui.js'

export default function Sidebar() {
    const [image, setImage] = useState(
        'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1699660800&semt=ais'
    )
    useEffect(() => {
        apiClient.get("me").then((response) => {
            setImage(response.data.images[0].url)
        })
    })
    return (
        <div className='sidebar-container'>
            <img
                src={image}
                className='profile-img'
                alt='profile'
            />
            <div>
                <SidebarButton title='Feed' to='/feed' icon={<MdSpaceDashboard />} />
                <SidebarButton title='Trending' to='/trending' icon={<FaGripfire />} />
                <SidebarButton title='Player' to='/player' icon={<FaPlay />} />
                <SidebarButton title='Favorites' to='/favorites' icon={<MdFavorite />} />
                <SidebarButton title='Library' to='/' icon={<IoLibrary />} />
            </div>
            <SidebarButton title='Đăng xuất' to='' icon={<FaSignOutAlt />} />
        </div>
    )
}
