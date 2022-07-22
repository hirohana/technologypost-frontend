import { ARTICLES_DATA } from 'types/articles/articles';
import { Card } from 'components/molecules/card/Card';

import styles from './Cards.module.scss';

const Cards = (props: { data: ARTICLES_DATA }) => {
  const { data } = props;

  return (
    <div className={styles.container}>
      {data.length !== 0 &&
        data.map((card) => <Card data={card} key={card.title} />)}
    </div>
  );
};

export { Cards };
