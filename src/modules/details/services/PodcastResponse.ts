export type PodcastResponse = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl600: string;
  feedUrl: string;
};

export type EpisodeResponse = {
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  description: string;
  episodeUrl: string;
};

type DetailsResponse = PodcastResponse | EpisodeResponse;

export interface PodcastDetailDataResponse {
  results: DetailsResponse[];
}
