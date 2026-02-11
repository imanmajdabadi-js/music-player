import { Song } from '@/data/songs';
import Image from 'next/image';
interface PlayListProps {
  songs: Song[];
  currentSongId: string;
  onSelect: (song: Song) => void;
}

const PlayList = ({ currentSongId, onSelect, songs }: PlayListProps) => {
  return (
    <ul className="mt-16 space-y-4">
      {songs.map((song) => {
        return (
          <li
            className="bg-[#3F005D] cursor-pointer rounded-xl p-4 flex gap-x-4 items-center z-50 text-white"
            onClick={() => onSelect(song)}
            style={{
              fontSize: song.id === currentSongId ? '14px' : '12px',
              fontWeight: song.id === currentSongId ? 'bolder' : 'normal',
            }}
            key={song.id}
          >
            <Image
              style={{ width: '100px', height: '100px' }}
              className="rounded-lg object-cover"
              height={180}
              priority
              width={100}
              src={song.cover!}
              alt="pic"
            />
            {song.artist} - {song.title}
          </li>
        );
      })}
    </ul>
  );
};

export default PlayList;
