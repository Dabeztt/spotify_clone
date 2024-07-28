import React, { useEffect, useState } from 'react'
import '../player/player.css'
import { useLocation } from 'react-router-dom'
import apiClient from '../../nhaccuatui.js'
import SongCard from '../../components/songCard/index.js'
import Queue from '../../components/queue/index.js'
import AudioPlayer from '../../components/audioPlayer/index.js'
import Widgets from '../../components/widgets/index.js'

export default function Player() {

    const location = useLocation()
    const [tracks, setTracks] = useState([])
    const [currentTrack, setCurrentTrack] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (location.state) {
            apiClient.get('playlists/' + location.state?.id + '/tracks')
                .then((res) => {
                    setTracks(res.data.items)
                    setCurrentTrack(res.data.items[0].track)
                })
        }
    }, [location.state])

    useEffect(() => {
        setCurrentTrack(tracks[currentIndex]?.track);
    }, [currentIndex, tracks]);

    return (
        <div className='screen-container flex'>
            <div className='left-player-body'>
                <AudioPlayer currentTrack={currentTrack} total={tracks} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
                <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
            </div>
            <div className='right-player-body'>
                {currentTrack && <SongCard album={currentTrack?.album} />}
                <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
            </div>
        </div>
    )
}
