import { Link, useOutletContext, useParams } from 'react-router-dom';
import { ContextEpisodes } from '@/modules/core/types';
import { Paths } from '@/modules/core/routes';
import * as styles from './listEpisodes.module.scss';

export const ListEpisodes = () => {
  const { episodes } = useOutletContext<ContextEpisodes>();
  const urlParams = useParams();
  const podcastId = urlParams?.['podcastId'] ?? '';

  return (
    <div className={styles.episodes}>
      <div className={styles.episodes__counter}>
        <span>Episodes: {episodes.length}</span>
      </div>
      <div className={styles.episodes__container_table}>
        <table>
          <thead>
            <tr className={styles.trHead}>
              <th className={`${styles.th} ${styles['th--title']}`}>Title</th>
              <th className={`${styles.th} ${styles['th--date']}`}>Date</th>
              <th className={`${styles.th} ${styles['th--time']}`}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => {
              const episodeLink = `${Paths.baseDetails}${podcastId}${Paths.baseEpisodes}${episode.id}`;

              return (
                <tr key={episode.id}>
                  <td className={`${styles.td} ${styles['td--right']}`} role='cell'>
                    <Link className={styles.link} to={episodeLink} aria-label='link-episode'>
                      {episode.title}
                    </Link>
                  </td>
                  <td className={styles.td}>{episode.date}</td>
                  <td className={`${styles.td} ${styles['td--center']}`}>{episode.duration}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
