import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

const humanizeDate = (date: string) =>
  format(new Date(date), 'dd MMMM yyyy', { locale: fr });

export default humanizeDate;
