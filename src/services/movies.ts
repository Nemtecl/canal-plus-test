import { Movie } from '../@types/Movie';
import { DiscoverMovie } from '../@types/DiscoverMovie';
import { Paginated } from '../@types/Paginated';
import axios from 'axios';

export const getMovies = (page: number, sortKey: string | null) =>
  axios.get<Paginated<DiscoverMovie[]>, Paginated<DiscoverMovie>>(
    'discover/movie',
    {
      params: {
        page,
        ...(sortKey ? { sort_by: sortKey } : {}),
      },
    },
  );

export const getMovieById = (id: number) =>
  axios.get<Movie, Movie>(`movie/${id}`);
