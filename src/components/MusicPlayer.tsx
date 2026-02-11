'use client';

import { Song, songs } from '@/data/songs';
import { Next, Pause, Play, Previous } from 'iconsax-reactjs';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import PlayList from './PlayList';

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState<string>(songs[0].id);

  const currentSong = songs.find((song) => song.id === currentSongId)!;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error(err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSelectSong = (song: Song) => {
    setCurrentSongId(song.id);
    setIsPlaying(true);
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    audio.load();
    if (isPlaying) {
      audio.play().catch((err) => console.error('Auto-play error:', err));
    }
  }, [currentSongId]);

  const playNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSongId);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSongId(songs[nextIndex].id);
  };

  const playPrev = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSongId);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSongId(songs[prevIndex].id);
  };
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = newTime;
  };

  const formatTime = (time: number) =>
    isNaN(time) ? '00:00' : `${Math.floor(time / 60)}:${('0' + Math.floor(time % 60)).slice(-2)}`;

  return (
    <>
      <div className="flex flex-col items-center mx-auto justify-center">
        <audio ref={audioRef} onEnded={playNext}>
          <source src={currentSong.src} />
        </audio>

        <div className="text-center flex items-center justify-center flex-col relative w-full h-full">
          <Image
            height={250}
            priority
            width={250}
            style={{ width: '250px', height: '250px' }}
            className="rounded-lg object-cover"
            src={currentSong.cover!}
            alt="cover"
          />
          <h2 className="text-xl font-bold  text-white mt-7">{currentSong.title}</h2>
          <h3 className="font-bold text-white mt-2 text-sm">{currentSong.artist}</h3>
        </div>

        <div className="flex items-center my-4 gap-6 ">
          <button
            onClick={playPrev}
            className="p-3 rounded-full cursor-pointer"
            aria-label="Previous"
          >
            <Previous size="24" color="#ffffff" />
          </button>

          <button
            onClick={togglePlay}
            className="p-4 rounded-full cursor-pointer bg-[#3F005D] hover:bg-indigo-800 transition"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size="24" color="#ffffff" /> : <Play size="24" color="#ffffff" />}
          </button>

          <button onClick={playNext} className="p-3 rounded-full cursor-pointer " aria-label="Next">
            <Next size="24" color="#ffffff" />
          </button>
        </div>

        <div className="w-full max-w-xl px-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-white border rounded-xl p-1">
              {formatTime(currentTime)}
            </span>
            <div
              className="relative flex-1 h-3 bg-gray-800 rounded-lg cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="absolute top-0 left-0 h-full bg-[#FF00F5] rounded-lg"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-white border rounded-xl p-1">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
      <PlayList currentSongId={currentSongId} onSelect={handleSelectSong} songs={songs} />
    </>
  );
};

export default MusicPlayer;
