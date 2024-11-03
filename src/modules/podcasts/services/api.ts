/* eslint-disable no-undef */
import { PodcastsResponse, PodcastKeys } from './PodcastsResponse';
import { PodcastInterface } from '@/modules/core/models';

const PODCASTS_URL = `${process.env['API_ITUNES_URL']}/us/rss/toppodcasts/limit=100/genre=1310/json`;

const mapperToPodcasts = (response: PodcastsResponse): PodcastInterface[] => {
  return response.feed.entry.map((podcast) => ({
    id: podcast.id.attributes[PodcastKeys.id],
    title: podcast[PodcastKeys.title].label,
    author: podcast[PodcastKeys.author].label,
    urlImage: podcast[PodcastKeys.urlImage][2].label,
  }));
};

export const fetchPodcasts = async (): Promise<PodcastInterface[]> => {
  try {
    const queryUrl = `${process.env['API_CORS']}${encodeURIComponent(PODCASTS_URL)}`;
    const response = await fetch(queryUrl);
    const data = await response.json();
    return mapperToPodcasts(data);
  } catch (error) {
    console.error('Error: fetch podcasts ', error);
    throw error;
  }
};
