import { DiscoverMovie } from '../@types/DiscoverMovie';
import { Paginated } from '../@types/Paginated';
import React, { useEffect, useState } from 'react';
import { getMovies } from 'services/movies';
import { Grid, Rating } from '@mui/material';
import {
  DataGrid,
  GridColumns,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

interface Props {}

const columns: GridColumns<DiscoverMovie> = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    filterable: false,
  },
  {
    field: 'vote_count',
    headerName: 'Vote count',
    flex: 1,
    filterable: false,
  },
  {
    field: 'vote_average',
    headerName: 'Vote average',
    flex: 1,
    renderCell: ({ value }) => <Rating precision={0.25} value={value / 2} />,
    filterable: false,
  },
];

const Movies: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Paginated<DiscoverMovie> | null>();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);

  const getData = async (page: number, sort: string | null) => {
    setLoading(true);
    setData(await getMovies(page + 1, sort));
    setLoading(false);
  };

  useEffect(() => {
    getData(currentPage, sortKey);
  }, [currentPage, sortKey]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRedirect = ({ id }: GridRowParams<DiscoverMovie>) =>
    navigate(`/movies/${id}`);

  const handleSortChange = (model: GridSortModel) => {
    let sort = null;
    if (model.length) {
      const [{ field, sort: direction }] = model;
      sort = `${field}.${direction}`;
    }
    setSortKey(sort);
  };

  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100%' }}
    >
      <DataGrid
        columns={columns}
        pagination
        paginationMode="server"
        sortingMode="server"
        rows={data?.results || []}
        loading={loading}
        page={currentPage}
        rowCount={data?.total_results || 0}
        pageSize={20}
        onPageChange={handlePageChange}
        autoPageSize
        onRowClick={handleRedirect}
        onSortModelChange={handleSortChange}
        sx={{
          height: '600px',
        }}
      />
    </Grid>
  );
};

export default Movies;
