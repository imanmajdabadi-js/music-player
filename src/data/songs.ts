export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
  onSelect?: () => void;
}

export const songs: Song[] = [
  {
    id: '1',
    title: 'On The Floor',
    artist: 'Jenifer Lopez',
    src: 'assets/music/On The Floor.mp3',
    cover: 'assets/images/jenifer.jpg',
  },
  {
    id: '2',
    title: ' Faryad Zire Ab',
    artist: 'Dariush Eghbali',
    src: 'assets/music/Faryad-Zire-Ab.mp3',
    cover: 'assets/images/dariush.jpg',
  },

  {
    id: '3',
    title: 'Ba Man Sanama',
    artist: 'Homayoun Shajarian',
    src: 'assets/music/Ba Man Sanama.mp3',
    cover: 'assets/images/Homayoun.jpg',
  },

  {
    id: '4',
    title: 'Saghi.mp3',
    artist: 'Hayedeh',
    src: 'assets/music/Saghi.mp3',
    cover: 'assets/images/Haydeh.jpg',
  },
];
