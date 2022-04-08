import { Movie } from '../@types/Movie';

type Status = Movie['status'];

const statusColorMap: {
  status: Status;
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}[] = [
  {
    status: 'Canceled',
    color: 'error',
  },
  {
    status: 'Rumored',
    color: 'secondary',
  },
  {
    status: 'In Production',
    color: 'info',
  },
  {
    status: 'Planned',
    color: 'warning',
  },
  {
    status: 'Post Production',
    color: 'primary',
  },
  {
    status: 'Released',
    color: 'success',
  },
];

const statusToColor = (
  status: Status,
):
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning' =>
  statusColorMap.find((o) => o.status === status)?.color || 'default';

export default statusToColor;
