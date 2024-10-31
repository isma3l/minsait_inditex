import { badge } from './badge.module.scss';

type BadgeProps = {
  value: number;
};

export const Badge = ({ value }: BadgeProps) => {
  return (
    <span className={badge} aria-label='podcasts counter'>
      {value}
    </span>
  );
};
