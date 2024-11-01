/* eslint-disable no-undef */
import { PodcastsResponse, PodcastKeys } from './Response';
import { PodcastInterface } from '@/modules/core/models';

const PODCASTS_URL = '/us/rss/toppodcasts/limit=100/genre=1310/json';
const BASE_URL = `${process.env['API_CORS']}${process.env['API_ITUNES_URL']}${PODCASTS_URL}`;

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
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return mapperToPodcasts(data);
  } catch (error) {
    console.log('Error: fetch podcasts ', error);
    throw error;
  }
};
