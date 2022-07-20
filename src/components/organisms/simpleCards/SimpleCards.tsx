/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Container } from '@mui/material';

import { ARTICLES_DATA_FOR_USER_ARTICLE_LIST } from 'types/articles/articles';
import SimpleCard from 'components/molecules/simpleCard/SimpleCard';
import styles from './SimpleCards.module.scss';

type PROPS = {
  cardsData: ARTICLES_DATA_FOR_USER_ARTICLE_LIST;
};

const SimpleCards = (props: PROPS) => {
  const { cardsData } = props;
  return (
    <div className={styles.container}>
      <main>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {cardsData[0] &&
              cardsData.map((data, index) => (
                <SimpleCard data={data} index={index} key={data.article_id} />
              ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export { SimpleCards };
