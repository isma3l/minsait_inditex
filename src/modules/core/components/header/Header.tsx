import { Link } from 'react-router-dom';
import { Paths } from '@/modules/core/routes';
import { Spinner } from '../spinner/Spinner';
import * as styles from './header.module.scss';
import { useIsLoading } from '@/modules/core/hooks';

export const Header = () => {
  const { isLoading } = useIsLoading();

  return (
    <Link to={Paths.base}>
      <header className={styles.header}>
        <span className={styles.header__logo}>Podcaster</span>
        {isLoading && <Spinner />}
      </header>
    </Link>
  );
};
