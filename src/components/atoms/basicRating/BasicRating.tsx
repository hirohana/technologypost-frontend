import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

type PROPS = {
  rating: number;
};

const BasicRating = (props: PROPS) => {
  const { rating } = props;
  const [value] = React.useState<number | null>(rating);
  return (
    <Box>
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
};

export { BasicRating };
