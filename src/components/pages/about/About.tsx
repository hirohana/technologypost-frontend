import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';
import { DescriptionList } from 'components/molecules/descriptionList/DescriptionList';
import { useAboutList } from 'hooks/components/about/useAboutList';
import styles from './About.module.scss';

const About = () => {
  const { skillList } = useAboutList();
  return (
    <DefaultLayout>
      <div className={styles.container}>
        {skillList.length !== 0 &&
          skillList.map((item) => (
            <DescriptionList
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
              rating={item.rating}
            />
          ))}
      </div>
    </DefaultLayout>
  );
};

export default About;
