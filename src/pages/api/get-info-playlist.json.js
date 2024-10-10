import { allPlaylists, songs as allSongs } from "../../lib/data";

export async function GET({ params, request }) {
  // get the id from the url search params
  const { url } = request
  const urlObject = new URL(url)
  const id = urlObject.searchParams.get('id')
  const albumIdURL = urlObject.searchParams.get('albumId')

  console.log(albumIdURL)
  console.log(id)

  if(albumIdURL == null ){
    const playlist = allPlaylists.find((playlist) => playlist.id === id)
    const songs = allSongs.filter(song => song.albumId === playlist?.albumId)
    return new Response(JSON.stringify({ playlist, songs }), {
      headers: { "content-type": "application/json" },
    })
  }
  else{

    const playlist = allPlaylists.find((playlist) => playlist.albumId === Number(albumIdURL));
      const songs = allSongs.filter(song => song.id === Number(id) && song.albumId === Number(albumIdURL));
    return new Response(JSON.stringify({ songs, playlist }), {
      headers: { "content-type": "application/json" },
    })
    // const songs = allSongs.filter(song => song.albumId === albumIdURL)
    // return new Response(JSON.stringify({  songs }), {
    //   headers: { "content-type": "application/json" },
    // })
  }
    

  
}