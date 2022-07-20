import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';
import { DescriptionList } from 'components/molecules/descriptionList/DescriptionList';
import { useAboutList } from 'hooks/components/about/useAboutList';
import styles from './About.module.scss';
import AsideScrollTop from 'components/atoms/button/asideScrollTop/AsideScrollTop';
import { TitleAnimation } from 'components/atoms/titleAnimation/TitleAnimation';

const About = () => {
  const { profileList, skillList } = useAboutList();

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <main>
          <TitleAnimation title="プロフィール" />
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
          <AsideScrollTop />
          <TitleAnimation title="スキル一覧" />
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
          <TitleAnimation title="制作実績" />
        </main>
      </div>
    </DefaultLayout>
  );
};

export default About;
