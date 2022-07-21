import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { ARTICLES_DATA } from 'types/articles/articles';
import styles from './Cards.module.scss';
import { Card } from 'components/molecules/card/Card';

const Cards = (props: { data: ARTICLES_DATA }) => {
  const { data } = props;
  console.log(data);
  return <div className={styles.container}>{data && <Card data={data} />}</div>;
};

export { Cards };
