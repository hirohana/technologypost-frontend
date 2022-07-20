import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';
import { DescriptionList } from 'components/molecules/descriptionList/DescriptionList';
import { useAboutList } from 'hooks/components/about/useAboutList';
import styles from './About.module.scss';

const About = () => {
  const { profileList, skillList } = useAboutList();

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <main>
          <section className={styles.profile_container}>
            <div className={styles.pfofile_image_ul}>
              <img
                src={profileList[0].image}
                alt="profileImage"
                className={styles.profile_image}
              />
              <ul className={styles.profile_ul}>
                <li>名前: {profileList[0].userName}</li>
                <li>年齢: {profileList[0].age}</li>
                <li>出身: {profileList[0].from}</li>
              </ul>
            </div>
            <p className={styles.profile_description}>
              {profileList[0].description}
            </p>
          </section>
          <section className={styles.skill_container}>
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
          </section>
        </main>
      </div>
    </DefaultLayout>
  );
};

export default About;
