import { useGetPodcasts } from './useGetPodcasts';

export const Podcasts = () => {
  const { data, error, isLoading } = useGetPodcasts();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  console.log('ddata', data);

  return <h1>Podcasts</h1>;
};

/*
https://tanstack.com/query/latest/docs/framework/react/plugins/createSyncStoragePersister
https://tanstack.com/query/latest/docs/framework/react/overview
https://baydis.medium.com/building-scalable-and-efficient-data-fetching-with-tanstack-query-79ce37b367a4
*/
