import { audio } from './audiocontrol.module.scss';

type AudioControlComponentPros = {
  url: string;
};

export const AudioControlComponent = ({ url }: AudioControlComponentPros) => {
  return (
    <audio controls className={audio} role='application' aria-label='music player'>
      <source src={url} type='audio/ogg' />
      <source src={url} type='audio/mpeg' />
      <source src={url} type='audio/mp3' />
      Your browser dont support the audio format
    </audio>
  );
};
