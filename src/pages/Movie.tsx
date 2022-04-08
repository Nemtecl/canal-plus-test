import { Movie } from '../@types/Movie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMovieById } from 'services/movies';
import {
  Chip,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { humanizeDate, statusToColor } from 'utils';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

interface Props {}

const MoviePage: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<Movie | null>();

  const imageUrl = process.env.REACT_APP_IMAGE_URL || '';

  useEffect(() => {
    const getMovie = async () => {
      try {
        setMovie(await getMovieById(+(id || 0)));
      } catch {
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!movie) {
    navigate('/404');
    return <></>;
  }

  const {
    backdrop_path,
    genres,
    vote_average,
    status,
    overview,
    poster_path,
    release_date,
    title,
  } = movie;

  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '100%',
        boxSizing: 'border-box',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
      }}
    >
      <Grid
        sx={{
          width: '100%',
          zIndex: 1,
          backgroundSize: 'cover',
          background: 'no-repeat',
          backgroundImage: `url('${imageUrl}/original/${backdrop_path}')`,
          backgroundPosition: 'center',
        }}
      >
        <Grid>
          <Grid
            sx={{
              color: 'white',
              backgroundImage:
                'linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) 150px, rgba(31.5, 31.5, 31.5, 0.84) 100%)',
            }}
          >
            <Box
              sx={{
                padding: '40px',
                boxSizing: 'border-box',
                zIndex: 0,
                width: '100%',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Grid>
                  <img
                    src={`${imageUrl}/original/${poster_path}`}
                    alt="Poster"
                    style={{
                      display: 'block',
                      width: '100%',
                      minWidth: '100%',
                      height: '100%',
                      minHeight: ' 100%',
                      outline: 'none',
                      padding: '30px',
                    }}
                  />
                </Grid>
                <Grid display="flex" flexDirection="column">
                  <Grid display="flex" alignItems="center">
                    <Typography variant="h2">{title}</Typography>
                    <Chip
                      label={status}
                      color={statusToColor(status)}
                      sx={{ mx: 1 }}
                    />
                  </Grid>
                  <Rating precision={0.25} value={vote_average / 2} />
                  <Grid display="flex" sx={{ color: 'white', my: 1 }}>
                    {genres.map(({ name, id }) => (
                      <Chip
                        key={id}
                        label={name}
                        color="primary"
                        sx={{ mx: 1 }}
                      />
                    ))}
                  </Grid>
                  <Typography>{humanizeDate(release_date)}</Typography>
                  <Typography>{overview}</Typography>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default MoviePage;
