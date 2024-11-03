import { useOutletContext, useParams } from 'react-router-dom';
import Linkify from 'react-linkify';
import { AudioControlComponent } from '../../components';
import { ContextEpisodes } from '@/modules/core/types';
import * as styles from './episodeDetails.module.scss';

export const EpisodeDetails = () => {
  const urlParams = useParams();
  const { episodes } = useOutletContext<ContextEpisodes>();
  const paramId = urlParams?.['episodeId'];
  const episode = episodes.find((ep) => ep.id.toString() === paramId);

  if (episode === undefined) return null;

  return (
    <div className={styles.detail}>
      <div className={styles.detail__content}>
        <div className={styles.detail__description}>
          <h2 aria-label='title'>{episode.title}</h2>
          <Linkify>{episode.description}</Linkify>
        </div>
        <AudioControlComponent url={episode.audioUrl} />
      </div>
    </div>
  );
};
