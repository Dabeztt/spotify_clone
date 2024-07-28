import React, { useEffect, useState } from 'react'
import '../widgets/widgets.css'
import apiClient from '../../nhaccuatui.js'
import WidgetCard from './widgetCard.js'

export default function Widgets({ artistID }) {

    const [similar, setSimilar] = useState([])
    const [featured, setFeatured] = useState([])
    const [newRelease, setNewRelease] = useState([])

    console.log(similar, featured, newRelease)

    useEffect(() => {
        apiClient.get(`/artists/${artistID}/related-artists`)
            .then((res) => {
                const a = res.data?.artists.slice(0, 3)
                setSimilar(a)
            })
            .catch(err => console.error(err))

        apiClient.get(`/browse/featured-playlists`)
            .then((res) => {
                const a = res.data?.playlists.items.slice(0, 3)
                setFeatured(a)
            })
            .catch(err => console.error(err))
        apiClient.get(`/browse/new-releases`)
            .then((res) => {
                const a = res.data?.albums.items.slice(0, 3)
                setNewRelease(a)
            })
            .catch(err => console.error(err))
    }, [artistID])

    return (
        <div className='widgets-body flex'>
            <WidgetCard title='Nghệ sĩ tương tự' similar={similar} />
            <WidgetCard title='Dành cho bạn' featured={featured} />
            <WidgetCard title='Mới phát hành' newRelease={newRelease} />
        </div>
    )
}
