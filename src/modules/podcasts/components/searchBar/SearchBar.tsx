import { Badge } from '../badge/Badge';
import * as styles from './searchBar.module.scss';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  podcastTotal: number;
};

export const SearchBar = ({ podcastTotal, value, onChange }: SearchBarProps) => {
  return (
    <div className={styles.searchBar}>
      <Badge value={podcastTotal} />
      <input
        value={value}
        className={styles.searchBar__input}
        placeholder='Filter podcasts...'
        onChange={(ev) => onChange(ev.target.value)}
        aria-label='text-searched'
      />
    </div>
  );
};
