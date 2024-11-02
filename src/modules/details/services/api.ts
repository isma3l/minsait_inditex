/* eslint-disable no-undef */
import Parser from 'rss-parser';
import { PodcastDetailDataResponse } from './PodcastResponse';
import { EpisodeInterface, PodcastDetailsInterface, PodcastInterface } from '@/modules/core/models';
import { formatDate } from '@/modules/core/util';

const PODCASTS_DETAILS_URL = '/lookup?id=';
const QUERY_URL = `${process.env['API_CORS']}${process.env['API_ITUNES_URL']}${PODCASTS_DETAILS_URL}`;

const parserXML = new Parser();

const mapperRssToEpisode = (
  item: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  } & Parser.Item,
): EpisodeInterface => {
  return {
    id: item.guid ?? '',
    title: item.title ?? '',
    date: formatDate(item.pubDate ?? ''),
    duration: item['itunes'].duration as string,
    description: item.content ?? '',
    audioUrl: item.enclosure?.url ?? '',
  };
};

export const fetchDetailsPodcast = async (podcastId: string): Promise<PodcastDetailsInterface> => {
  try {
    const response = await fetch(`${QUERY_URL}${podcastId}`);
    if (!response.ok) throw new Error();
    const data = await (response.json() as Promise<PodcastDetailDataResponse>);
    const podcastDetailsResponse = data.results[0];
    const dataRSS = await parserXML.parseURL(
      `${process.env['API_CORS']}${podcastDetailsResponse.feedUrl}`,
    );

    const podcast: PodcastInterface = {
      id: podcastDetailsResponse.trackId,
      title: podcastDetailsResponse.trackName,
      author: podcastDetailsResponse.artistName,
      urlImage: podcastDetailsResponse.artworkUrl600,
      description: dataRSS?.description ?? '',
    };
    const episodes: EpisodeInterface[] = dataRSS.items.map(mapperRssToEpisode);

    const podcastDetails: PodcastDetailsInterface = { podcast, episodes };
    return podcastDetails;
  } catch (error) {
    console.log(`Error: fetch details podcast with id: ${podcastId}`, error);
    throw error;
  }
};
