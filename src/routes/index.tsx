import { CircularProgress } from '@mui/material';
import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router';

export const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );
};

const Movies = Loadable(lazy(() => import('../pages/Movies')));
const Movie = Loadable(lazy(() => import('../pages/Movie')));
const NotFound = Loadable(lazy(() => import('../pages/NotFound')));

export default function Router() {
  return useRoutes([
    {
      path: 'movies',
      element: <Movies />,
    },
    {
      path: 'movies/:id',
      element: <Movie />,
    },
    {
      path: '/',
      element: <Navigate to="/movies" replace />,
    },
    {
      path: '/404',
      element: <NotFound />,
    },
  ]);
}
