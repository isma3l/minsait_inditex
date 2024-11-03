/* eslint-disable no-undef */
import Parser from 'rss-parser';
import { PodcastDetailDataResponse, PodcastResponse, EpisodeResponse } from './PodcastResponse';
import { EpisodeInterface, PodcastDetailsInterface, PodcastInterface } from '@/modules/core/models';
import { formatDate, formatTime } from '@/modules/core/util';

const DETAILS_URL = `${process.env['API_ITUNES_URL']}/lookup?id=`;
const QUERY_PARAMS = '&media=podcast &entity=podcastEpisode&limit=20';
const parserXML = new Parser();

const buildDetailsUrl = (podcastId: string) => `${DETAILS_URL}${podcastId}${QUERY_PARAMS}`;

const mapperToEpisode = (episode: EpisodeResponse): EpisodeInterface => {
  return {
    id: episode.trackId,
    title: episode.trackName,
    date: formatDate(episode.releaseDate),
    duration: formatTime(episode.trackTimeMillis),
    description: episode.description,
    audioUrl: episode.episodeUrl,
  };
};

const mapperToPodcast = (podcastResponse: PodcastResponse): PodcastInterface => ({
  id: podcastResponse.trackId,
  title: podcastResponse.trackName,
  author: podcastResponse.artistName,
  urlImage: podcastResponse.artworkUrl600,
  description: '',
});

export const fetchDetailsPodcast = async (podcastId: string): Promise<PodcastDetailsInterface> => {
  try {
    const encodedUrl = encodeURIComponent(buildDetailsUrl(podcastId));
    const queryUrl = `${process.env['API_CORS']}${encodedUrl}`;
    const response = await fetch(queryUrl);

    if (!response.ok) throw new Error();

    const data = await (response.json() as Promise<PodcastDetailDataResponse>);
    const [podcastResponse, ...episodesResponse] = data.results;
    const podcastDetailsResponse = <PodcastResponse>podcastResponse;
    const dataRSS = await parserXML.parseURL(
      `${process.env['API_CORS']}${podcastDetailsResponse.feedUrl}`,
    );

    const podcast = mapperToPodcast(podcastDetailsResponse);
    const episodes: EpisodeInterface[] = (<EpisodeResponse[]>episodesResponse).map(mapperToEpisode);
    console.log('episodes', episodes);
    const podcastDetails: PodcastDetailsInterface = {
      podcast: { ...podcast, description: dataRSS?.description ?? '' },
      episodes,
    };
    return podcastDetails;
  } catch (error) {
    console.error(`Error: fetch details podcast with id: ${podcastId}`, error);
    throw error;
  }
};
