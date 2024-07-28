import React, { useEffect, useState } from 'react';
import APIKit from '../../nhaccuatui.js';
import '../favorites/favorites.css';

export default function Favorites() {
    const [favoritesData, setFavoritesData] = useState([]);

    useEffect(() => {
        APIKit.get('favorites')
            .then((response) => {
                setFavoritesData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching favorites data:', error);
            });
    }, []);

    return (
        <div className='screen-container'>
            <div className='favorites-container'>
                <h2>Favorites</h2>
                {favoritesData.map((item) => (
                    <div key={item.id} className='favorites-item'>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
