import React from 'react';

type PROPS = {
  image: string;
  rank: any;
  information: string;
};

const cardsAndInformation = (props: PROPS) => {
  const { image, rank, information } = props;
  return <div>cardsAndInformation</div>;
};

export default cardsAndInformation;
