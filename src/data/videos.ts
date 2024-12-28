type VideoType = "podcase" | "actu" | "documentary" | "film" | "series" | "music";

type Video = {
  title: string;
  coverUrl: string;
  description: string;
  type: VideoType;
};

const videos: Video[] = [
  {
    title: "Podcast\nIlda Amani",
    description: "2024 Ed-passion",
    coverUrl: "/images/ilda-amani-podcast.jpg",
    type: "podcase",
  },
  {
    title: "Nyama\nThe boxing champ",
    description: "2024 Documentary",
    coverUrl: "/images/nyama-boxing-champ.png",
    type: "documentary",
  },
  {
    title: "Chika&\nTania",
    description: "2024 short-film",
    coverUrl: "/images/chika-and-tania.png",
    type: "film",
  },
  {
    title: "What'up NNP\nMac Mini M4",
    description: "2024 Actu",
    coverUrl: "/images/whatup-NNP.jpg",
    type: "actu",
  },
];

export default videos;
