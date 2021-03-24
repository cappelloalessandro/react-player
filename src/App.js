import React, { useState, useRef } from "react";
// styles
import './style/app.scss';
// adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

// import util
import data from "./data";
// import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  // ref 
  const audioRef = useRef(null);
  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[4]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage:0,
});
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) =>{
  const current = e.target.currentTime;
  const duration = e.target.duration;
  // calculiamo la %, (togliamo il numero dopo la virgola del tempo, lasciando solo il secondo esatto)
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent / roundedDuration) * 100);
 
  setSongInfo({...songInfo, currentTime: current, duration, animationPercentage:animation });}

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
    return;
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav 
      libraryStatus={libraryStatus}
      setLibraryStatus={setLibraryStatus}/>

      <Song isPlaying={isPlaying} currentSong={currentSong} />

      <Player 
      audioRef={audioRef}
      setIsPlaying={setIsPlaying}
      isPlaying={isPlaying}
      currentSong={currentSong}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      /> 

      <Library  
      audioRef={audioRef} 
      songs={songs} 
      setCurrentSong={setCurrentSong} 
      isPlaying={isPlaying}
      setSongs={setSongs}
      libraryStatus={libraryStatus}
      />


      <audio 
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler} 
            ref={audioRef} 
            src={currentSong.audio}
            onEnded={songEndHandler}>
      </audio>
    </div>
  );
}

export default App;
