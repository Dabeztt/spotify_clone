import React from 'react'
import '../songCard/albumInfo.css'

export default function AlbumInfo({ album }) {
    console.log(album)

    const artists = []
    album?.artists?.forEach(element => {
        artists.push(element.name)
    });
    return (
        <div className='albumInfo-card'>
            <div className='albumName-container'>
                <div className='marquee'>
                    <p>{album?.name + " - " + artists?.join(", ")}</p>
                </div>
            </div>
            <div className='album-info'>
                <p>{`${album?.name} là một ${album?.album_type} của nghệ sĩ ${artists?.join(", ")} với tổng cộng ${album?.total_tracks} bài hát`}</p>
            </div>
            <div className='album-release'>
                <p>Ngày phát hành: {album?.release_date}</p>
            </div>
        </div>
    )
}
