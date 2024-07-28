import React, { useEffect, useRef, useState } from 'react'
import '../audioPlayer/audioPlayer.css'
import ProgressCircle from './progressCircle.js'
import WaveAnimation from '../audioPlayer/waveAnimation.js'
import Controls from '../audioPlayer/controls.js'

export default function AudioPlayer({ currentTrack, currentIndex, setCurrentIndex, total }) {

    const [isPlaying, setIsPlaying] = useState(true)
    const [trackProgress, setTrackProgress] = useState(0)
    var AudioSrc = total[currentIndex]?.track.preview_url

    const audioRef = useRef(new Audio(total[0]?.track.preview_url))

    const intervalRef = useRef()

    const isReady = useRef(false)

    const { duration } = audioRef.current

    const currentPercentage = duration ? (trackProgress / duration) * 100 : 0

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                handleNext();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement.src) {
            if (isPlaying) {
                audioElement.play().then(() => {
                    startTimer();
                }).catch(error => {
                    console.error("Play error:", error);
                });
            } else {
                clearInterval(intervalRef.current);
                audioElement.pause();
            }
        } else {
            if (isPlaying) {
                audioRef.current = new Audio(AudioSrc);
                audioRef.current.play().then(() => {
                    startTimer();
                }).catch(error => {
                    console.error("Play error:", error);
                });
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentIndex]);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(AudioSrc);

        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    startTimer();
                })
                .catch(error => {
                    console.error('Play error:', error);
                });
        } else {
            isReady.current = true;
        }
    }, [currentIndex]);


    useEffect(() => {
        return () => {
            audioRef.current.pause()
            clearInterval(intervalRef.current)
        }
    }, [])

    const handleNext = () => {
        if (currentIndex < total.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentIndex(0)
        }
    }

    const handlePrev = () => {
        if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1)
        else setCurrentIndex(currentIndex - 1)
    }

    const artists = []
    currentTrack?.album?.artists.forEach((artist) => {
        artists.push(artist.name)
    });

    const addZero = (n) => {
        return n > 9 ? '' + n : '0' + n
    }

    return (
        <div className='player-body flex'>
            <div className='player-left-body'>
                <ProgressCircle
                    percentage={currentPercentage}
                    isPlaying={true}
                    image={currentTrack?.album?.images[0]?.url}
                    size={300}
                    color="#70a0af"
                />
            </div>
            <div className='player-right-body flex'>
                <p className='song-title'>{currentTrack?.name}</p>
                <p className='song-artist'>{artists.join(' | ')}</p>
                <div className='player-right-bottom flex'>
                    <div className='song-duration flex'>
                        <p className='duration'>0:{addZero(Math.round(trackProgress))}</p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className='duration'>0:30</p>
                    </div>
                    <Controls
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        total={total}
                    />
                </div>
            </div>
        </div>
    )
}
