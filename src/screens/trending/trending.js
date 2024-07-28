import React, { useEffect, useState } from 'react';
import APIKit from '../../nhaccuatui.js';
import '../trending/trending.css';

export default function Trending() {
    const [trendingData, setTrendingData] = useState([]);

    useEffect(() => {
        APIKit.get('trending')
            .then((response) => {
                setTrendingData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching trending data:', error);
            });
    }, []);

    return (
        <div className='screen-container'>
            <div className='trending-container'>
                <h2>Trending</h2>
                {trendingData.map((item) => (
                    <div key={item.id} className='trending-item'>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
