export interface Movie {
  id: number;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  overview: string;
  poster_path: string;
  release_date: string;
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  title: number;
  vote_average: number;
}
