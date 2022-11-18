import { Hex } from '@gear-js/api';
import { Button } from '@gear-js/ui';
import { Players } from 'components';
import styles from './RoundResult.module.scss';

type Props = {
  name: string;
  game: string;
  round: string;
  winners: Hex[];
  loosers: Hex[];
};

function RoundResult({ name, game, round, winners, loosers }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <span>{name}</span>
        <span>Game #{game}</span>
      </h2>
      <h3 className={styles.subheading}>Round {round} result</h3>
      <Players heading="Advance to the next round" list={winners} className={styles.players} center />
      <Players heading="Losers" list={loosers} center />
      <Button text="Close" size="large" className={styles.button} />
    </div>
  );
}

export { RoundResult };