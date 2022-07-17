import javascript from 'images/profile/javascript.png';
import docker from 'images/profile/docker.png';
import firebase from 'images/profile/firebase.png';
import github from 'images/profile/github.png';
import htmlCss from 'images/profile/html-css.png';
import java from 'images/profile/java.png';
import mysql from 'images/profile/mysql.png';
import node from 'images/profile/node-js.png';
import react from 'images/profile/react.png';
import typescript from 'images/profile/typescript.png';

const useAboutList = () => {
  const skillList = [
    {
      title: 'HTML-CSS',
      image: htmlCss,
      rating: 4,
      description: 'HTML-CSS使えます',
    },
    {
      title: 'JavaScript',
      image: javascript,
      rating: 4,
      description: 'javascript使えます',
    },
    {
      title: 'TypeScript',
      image: typescript,
      rating: 3,
      description: 'typescript使えます',
    },
    {
      title: 'React',
      image: react,
      rating: 4,
      description: 'react使えます',
    },
    {
      title: 'Node',
      image: node,
      rating: 3.5,
      description: 'サーバーサイドnode(express)使えます',
    },

    {
      title: 'Java',
      image: java,
      rating: 2,
      description: 'java使えます',
    },
    {
      title: 'MySQL',
      image: mysql,
      rating: 3,
      description: 'MySQL使えます',
    },
    {
      title: 'Firebase',
      image: firebase,
      rating: 3,
      description: 'Firebase使えます',
    },
    {
      title: 'Git-GitHub',
      image: github,
      rating: 2.5,
      description: 'Git-GitHub使えます',
    },
    {
      title: 'Docker',
      image: docker,
      rating: 2.5,
      description: 'docker使えます',
    },
  ];
  return { skillList };
};

export { useAboutList };
