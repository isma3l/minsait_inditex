import { useQuery } from '@tanstack/react-query';
import { fetchPodcasts } from '../services';

export const useGetPodcasts = () => {
  return useQuery({
    queryKey: ['podcastsData'],
    queryFn: fetchPodcasts,
  });
};
