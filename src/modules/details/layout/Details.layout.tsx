import { useParams, Outlet } from 'react-router-dom';
import { PodcastDescription } from '../components';
import { useGetDetailsPodcast } from '../hooks';
import { layout } from './detailsLayout.module.scss';

export const DetailsLayout = () => {
  const urlParams = useParams();
  const { data, error } = useGetDetailsPodcast(urlParams['podcastId'] ?? '');

  if (error) return <h1>Hubo un error obteniendo los detalles del podcast</h1>;
  if (!data) return <></>;

  return (
    <div className={layout}>
      <PodcastDescription podcast={data.podcast} />
      <Outlet context={{ episodes: data?.episodes ?? [] }} />
    </div>
  );
};
