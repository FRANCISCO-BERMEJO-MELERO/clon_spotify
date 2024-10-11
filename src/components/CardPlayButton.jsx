import React from 'react';
import {Pause, Play} from './Player.jsx'
import { usePlayerStore } from '../store/playerStore.js';

const CardPlayButton = ({id, size = "small", background =  "green-500", color = "text-black", albumId = 0}) => {
    const {
        currentMusic,
        IsPlaying, 
        setIsPlaying, 
        setCurrentMusic,
        currentMusicId,
        setCurrentMusicId
    } = usePlayerStore(state => state);

    let IsPlayingPlaylist = false;
    let IsPlayingSong = false;

    if(albumId == 0){
        IsPlayingPlaylist = IsPlaying && (currentMusic?.playlist.id === id);
    } else {
        IsPlayingPlaylist = IsPlaying && (currentMusicId?.song === id && currentMusic?.playlist.id === albumId);
    }
    //Revisar este componente, el problema es que no se sincroniza bien el logo play y pause
    //Problema solucionado


    const handleClick = () => {
        if(IsPlayingPlaylist){
            setIsPlaying(false);
            return;
        }
        if(IsPlayingSong){
            setIsPlaying(false);
            return;
        }
        if(albumId == 0){
            fetch(`/api/get-info-playlist.json?id=${id}`)
            .then(res => res.json())
            .then(data =>{
                const {songs, playlist} = data
                console.log(songs)
            setIsPlaying(true)
            setCurrentMusic({ songs, playlist, song: songs[0]})
            })
        }
        else{
            console.log(albumId)
            console.log(id)
            const params = new URLSearchParams();
            params.append('albumId', albumId);
            params.append('id', id);
            fetch(`/api/get-info-playlist.json?${params.toString()}`)       
            .then(res => res.json())
            .then(data => {
                const {songs } = data
                console.log(songs)
                setIsPlaying(true)
                setCurrentMusic({ songs, playlist: { id: albumId }, song: songs[0] });
                setCurrentMusicId({ song: songs[0].id, albumId }); // Actualiza el ID actual
            })
        }
    }

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'
    const backgroundColor = background === 'green-500' ? 'bg-green-500' : 'bg-zinc-800'
    const iconColor = color === 'text-black' ? 'text-black' : 'text-white'
    const padding = size === 'small' ? 'p-3' : 'p-4'    


    return (
        <button onClick={handleClick} className={`	card-play-button rounded-full ${backgroundColor} ${padding} hover:scale-105 transition hover:${background} ${iconColor}`}>
            {IsPlayingPlaylist ? <Pause className={`${iconClassName } `} /> : <Play className={` ${iconClassName}`} />}
        </button>
    );
}

export default CardPlayButton;
