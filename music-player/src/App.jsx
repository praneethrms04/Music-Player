import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import "./App.css";

const App = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    id: 1,
    title: "For You",
  });
  const [playlistId, setPlaylistId] = useState(1);
  const [selectedSongIdx, setSelectedSongIdx] = useState(-1);
  const [selectedSong, setSelectedSong] = useState({});
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songSelectedPlaylistId, setSongSelectedPlaylistId] =
    useState(playlistId);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("play", () => {
        setIsPlaying(true);
      });
      audio.addEventListener("pause", () => {
        setIsPlaying(false);
      });
    }
    return () => {
      if (audio) {
        audio.removeEventListener("play", () => {
          setIsPlaying(true);
        });
        audio.removeEventListener("pause", () => {
          setIsPlaying(false);
        });
      }
    };
  }, [audio]);

  useEffect(() => {
    // it will check song is selected or not
    if (selectedSong?.photo) {
      // creating a new Image object
      const image = new Image();
      // setting image src to selected song image
      image.src = selectedSong?.photo;
      image.crossOrigin = "Anonymous"; // will enable CORS
      // when image loade, updates body background color
      image.onload = () => {
        // creating a canvas element
        const canvas = document.createElement("canvas");
        // setting canvas width and height = image width and height
        canvas.width = image.width;
        canvas.height = image.height;
        // getting canvas context
        const ctx = canvas.getContext("2d");
        // drawing image on the canvas
        ctx.drawImage(image, 0, 0);
        // getting the pixel data of the canvas
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        // calculating average color of the image
        let r = 0,
          g = 0,
          b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        r = Math.floor(r / (data.length / 4));
        g = Math.floor(g / (data.length / 4));
        b = Math.floor(b / (data.length / 4));
        // set the body background color to the average color of the image
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        // set the background gradient color based on the average color of the image
        document.body.style.background = `linear-gradient(108.18deg, rgba(${r}, ${g}, ${b}, 0.6) 2.46%, rgba(0, 0, 0, 0.6) 99.84%), #000000`;
      };
    } else {
      // if no song has been selected, reset the background colors to the default values
      document.body.style.backgroundColor = "#F5F5F5";
      document.body.style.background =
        "linear-gradient(108.18deg, rgba(51, 66, 94, 0.6) 2.46%, rgba(0, 0, 0, 0.6) 99.84%), #000000";
    }
  }, [selectedSong]);

  const playlistHandler = (item) => {
    setPlaylistId(item?.id);
    setSelectedPlaylist(item);
  };

  const songHandler = (song) => {
    if (songSelectedPlaylistId !== playlistId) {
      setSongSelectedPlaylistId(playlistId);
    }
    setSelectedSong(song);
    if (audio) {
      audio?.pause();
    }
    const newAudio = new Audio(song?.url);
    setAudio(newAudio);
    setIsPlaying(true);
    const playAudioOnUserInteraction = () => {
      newAudio.play();
      document.removeEventListener("click", playAudioOnUserInteraction);
    };
    document.addEventListener("click", playAudioOnUserInteraction);
  };

  const playPauseHandler = () => {
    if (!audio) return;
    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
    } else {
      audio?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="App">
      <Navigation playlistId={playlistId} playlistHandler={playlistHandler} />
      <Sidebar
        selectedPlaylist={selectedPlaylist}
        playlistId={playlistId}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        songHandler={songHandler}
        selectedSongIdx={selectedSongIdx}
        setSelectedSongIdx={setSelectedSongIdx}
        setSongs={setSongs}
        songSelectedPlaylistId={songSelectedPlaylistId}
      />
      <Player
        selectedSong={selectedSong}
        selectedSongIdx={selectedSongIdx}
        songs={songs}
        setSelectedSongIdx={setSelectedSongIdx}
        isPlaying={isPlaying}
        playPauseHandler={playPauseHandler}
        audio={audio}
      />
    </div>
  );
};

export default App;
