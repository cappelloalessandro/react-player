import React from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core';
import LibrarySong from './LibrarySong';


const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, }) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Your Music</h2>
            <div className="library-songs">
                {songs.map((song) => (
                <LibrarySong
                songs={songs}
                setCurrentSong={setCurrentSong}
                active={song.active}
                song={song}
                id={song.id}
                key={song.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
                />))}
            </div>
        </div>
    )
}

export default Library