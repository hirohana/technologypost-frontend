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
import go from 'images/profile/go.png';
import AWS from 'images/profile/AWS.png';
import myImage from 'images/profile/cat-profile.png';

const useAboutList = () => {
  const profileList = [
    {
      image: myImage,
      userName: 'Hirohana',
      age: 38,
      from: '石川県',
      description: `
      Webサイトを閲覧頂きありがとうございます。
      2022/7月現在実務未経験ですが、Webエンジニアを目指しているHirohanaと申します。
      年齢は今年38歳になります。出身地は石川県です。
      フロントエンドはReact、バックエンドはNode.js、DBはMySQLを中心に勉強しております。
      具体的なスキルに関しては下記を御覧ください。
      まだまだ技術、知識共に未熟ですが社会に貢献できるWebエンジニアになりたいと思っております。
      興味をお持ちくださった方は、お問い合わせからご連絡いただけると幸いです。
      `,
    },
  ];

  const skillList = [
    {
      title: 'HTML-CSS',
      image: htmlCss,
      rating: 3,
      description:
        'HTMLタグ、CSSを使ったデザイン、アニメーションは基本的なものなら実装可能です。フレームワークはMaterial-UIを使っています。',
    },
    {
      title: 'JavaScript',
      image: javascript,
      rating: 4,
      description:
        'ES2015以降のモダンJavaScript、非同期処理、ブラウザAPI(DOM、InterSection、Fetch)等々、基本的なJavaScriptは使えます。その他必要に応じてキャッチアップ可能です。',
    },
    {
      title: 'TypeScript',
      image: typescript,
      rating: 3,
      description:
        '高度な型はまだ使えませんが、基本的な型定義を用いたコードを書くことは可能です。主にReactを使ったSPA開発で使用してます。',
    },
    {
      title: 'React',
      image: react,
      rating: 4,
      description:
        'React Hooksを使った関数コンポーネント作成及び主要なライブラリであるRedux、React-Router-Domを使った状態管理、CSRによるページ遷移によるSPA開発が可能です。コンポーネントはAtomic Designの考え方で分割してます。その他ライブラリも必要に応じてキャッチアップ可能です。',
    },
    {
      title: 'Node',
      image: node,
      rating: 4,
      description:
        'バックエンドは現在Node.js(Express)をメインに使っています。フロント側はReactを使用したSPAですので、バックエンド側はAPIサーバーとして実装しています。ただ、テンプレートエンジン(EJS)を使ったコードも実装できます。またRESTを意識したAPI設計、MySQLを利用したCRAD処理、トランザクション制御、悲観ロックも実装可能です。',
    },

    {
      title: 'Java',
      image: java,
      rating: 2,
      description:
        'バックエンド側はNode.jsを使用する前はJavaを半年ぐらい勉強し使っていました。ただWeb系のバックエンド側としてはJavaがあまり使われていないと知り、Node.jsに切り替えました。現在使ってないので忘れていますが、以前はTodoアプリを作成できるぐらいのコードは書けました。',
    },
    {
      title: 'Go',
      image: go,
      rating: 1,
      description:
        '今後Web系のバックエンドはGoが主流になるのではと考え、現在勉強を始めたばかりです。',
    },
    {
      title: 'MySQL',
      image: mysql,
      rating: 3,
      description:
        'SQL主要構文に加え集約関数、サブクエリ、テーブル結合、条件分岐など、基礎的なSQL構文は書けます。',
    },
    {
      title: 'Firebase',
      image: firebase,
      rating: 3,
      description:
        'FirebaseへのHostingを行いアプリをデプロイできます。Authentication、FireStore、Storage、Functionsなどが使用可能です。このWebサイトもフロントエンドはFirebaseにデプロイしてます。(バックエンドはHerokuになります)',
    },
    {
      title: 'Git-GitHub',
      image: github,
      rating: 2,
      description:
        '基本的なgit、githubコマンドは使えると思います。ただGitHub Actionsを利用したCI/CD環境構築が出来ないので、今後勉強をする予定です。',
    },
    {
      title: 'Docker',
      image: docker,
      rating: 2,
      description:
        'Dockerfile、docker-compose.ymlを作成して大抵の環境構築を行う事は可能です。',
    },
    {
      title: 'AWS',
      image: AWS,
      rating: 2,
      description:
        '以前書籍でAWSを勉強し、自分が作成したアプリをデプロイしたのですが、気づかない内にインスタンスの課金が発生してしまいそれ以来使っておりません。',
    },
  ];
  return { profileList, skillList };
};

export { useAboutList };
