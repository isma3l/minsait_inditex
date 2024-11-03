import { useState, useMemo } from 'react';
import { PodcastList, SearchBar } from '../components';
import { useGetPodcasts } from '../hooks';
import * as styles from './podcasts.module.scss';

export const Podcasts = () => {
  const { data, error } = useGetPodcasts();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPodcasts = useMemo(() => {
    const podcasts = data
      ? data.filter(
          (podcast) =>
            podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            podcast.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [];
    return podcasts;
  }, [searchTerm, data]);

  if (error) return <h1>Ocurrió un error al obtener los podcasts</h1>;

  return (
    <div className={styles.podcastsPage}>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        podcastTotal={filteredPodcasts.length}
      />
      <PodcastList data={filteredPodcasts} />
    </div>
  );
};
