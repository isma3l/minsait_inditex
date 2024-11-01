import { PodcastInterface } from '@/modules/core/models';
import { Link } from 'react-router-dom';
import * as styles from './podcast.module.scss';
import { Paths } from '@/modules/core/routes';

type PodcastProps = {
  podcast: PodcastInterface;
};

export const Podcast = ({ podcast }: PodcastProps) => {
  return (
    <Link to={`${Paths.podcastDetails}${podcast.id}`} className={styles.container} role='listitem'>
      <div className={styles.card}>
        <div className={styles.card__image}>
          <img src={podcast.urlImage} alt='podcast image' />
        </div>
        <div className={styles.card__text}>
          <p>{podcast.title}</p>
          <span>Author: {podcast.author}</span>
        </div>
      </div>
    </Link>
  );
};
