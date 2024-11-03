import { useQuery } from '@tanstack/react-query';
import { fetchDetailsPodcast } from '../services';

export const useGetDetailsPodcast = (podcastId: string) => {
  return useQuery({
    queryKey: ['detailsPodcast', podcastId],
    queryFn: () => fetchDetailsPodcast(podcastId),
  });
};
