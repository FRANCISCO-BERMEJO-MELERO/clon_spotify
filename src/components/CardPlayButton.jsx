import React from 'react';
import {Pause, Play} from './Player.jsx'
import { usePlayerStore } from '../store/playerStore.js';

const CardPlayButton = ({id}) => {
    const {
        currentMusic,
        IsPlaying, 
        setIsPlaying, 
        setCurrentMusic
    } = usePlayerStore(state => state);
    const IsPlayingPlaylist = IsPlaying && currentMusic?.playlist.id === id;

    const handleClick = () => {
        if(IsPlayingPlaylist){
            setIsPlaying(false);
            return;
        }
        fetch(`/api/get-info-playlist.json?id=${id}`)
        .then(res => res.json())
        .then(data =>{
            const {songs, playlist} = data
            setIsPlaying(true)
            setCurrentMusic({ songs, playlist, song: songs[0]})
        })
    }


    return (
        <button className='card-play-button rounded-full bg-green-500 p-4' onClick={handleClick}>
            {IsPlayingPlaylist ? <Pause/> : <Play/>}
        </button>
    );
}

export default CardPlayButton;
