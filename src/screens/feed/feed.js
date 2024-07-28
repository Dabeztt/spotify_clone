import React, { useEffect, useState } from 'react';
import APIKit from '../../nhaccuatui.js';
import '../feed/feed.css';

export default function Feed() {
    const [feedData, setFeedData] = useState([]);

    useEffect(() => {
        APIKit.get('feed')
            .then((response) => {
                setFeedData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching feed data:', error);
            });
    }, []);

    return (
        <div className='screen-container'>
            <div className='feed-container'>
                <h2>Feed</h2>
                {feedData.map((item) => (
                    <div key={item.id} className='feed-item'>
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
