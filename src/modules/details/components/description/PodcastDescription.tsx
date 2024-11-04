import { Link } from 'react-router-dom';
import { PodcastInterface } from '@/modules/core/models';
import { Paths } from '@/modules/core/routes';
import * as styles from './podcastDescription.module.scss';

type PodcastDescriptionProps = {
  podcast: PodcastInterface;
};

export const PodcastDescription = ({ podcast }: PodcastDescriptionProps) => {
  return (
    <div className={styles.description}>
      <Link className={styles.description__link} to={`${Paths.baseDetails}${podcast.id}`}>
        <img src={podcast.urlImage} className={styles.description__image} alt='album photo' />
        <div className={styles.description__song}>
          <h2 aria-label='title'>{podcast.title}</h2>
          <h3 aria-label='author'>by {podcast.author}</h3>
        </div>
      </Link>
      <div className={styles.description__detail}>
        <h2>Description:</h2>
        <h3
          aria-label='content description'
          dangerouslySetInnerHTML={{ __html: podcast.description ?? '' }}
        />
      </div>
    </div>
  );
};
