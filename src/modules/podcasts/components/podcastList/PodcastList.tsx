import { PodcastInterface } from '@/shared/models';
import { Podcast } from '../podcast/Podcast';
import { list } from './podcastList.module.scss';

type PodcastListProps = {
  data: PodcastInterface[];
};

export const PodcastList = ({ data }: PodcastListProps) => {
  return (
    <div className={list} role='list' aria-label='podcasts'>
      {data.map((item) => (
        <Podcast key={item.id} podcast={item} />
      ))}
    </div>
  );
};
