import { useInView } from 'react-intersection-observer';

import styles from './DescriptionList.module.scss';
import { BasicRating } from 'components/atoms/basicRating/BasicRating';

type PROPS = {
  title: string;
  description: string;
  image: string;
  rating: number;
};

const DescriptionList = (props: PROPS) => {
  const { title, description, image, rating } = props;
  const { ref, inView } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });

  return (
    <>
      <div
        className={`${styles.container} ${
          inView ? styles.appear : styles.disapear
        }`}
        ref={ref}
      >
        <img src={image} alt={title} className={styles.description_img} />
        <div className={styles.description_and_rating}>
          <BasicRating rating={rating} />
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export { DescriptionList };

// import { useInView } from 'react-intersection-observer';

// import styles from './DescriptionList.module.scss';
// import { BasicRating } from 'components/atoms/basicRating/BasicRating';

// type PROPS = {
//   title: string;
//   description: string;
//   image: string;
//   rating: number;
// };

// const DescriptionList = (props: PROPS) => {
//   const { title, description, image, rating } = props;
//   const { ref, inView } = useInView({
//     rootMargin: '200px',
//     triggerOnce: true,
//   });

//   return (
//     <>
//       <div
//         className={`${styles.container} ${
//           inView ? styles.appear : styles.disapear
//         }`}
//         ref={ref}
//       >
//         <img src={image} alt={title} className={styles.description_img} />
//         <div className={styles.description_and_rating}>
//           <BasicRating rating={rating} />
//           <p>{description}</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export { DescriptionList };
