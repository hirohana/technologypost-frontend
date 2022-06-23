type ARTICLES_DATA = {
  username: string;
  user_photo_url: string;
  user_id: number;
  title: string;
  letter_body: string;
  created_at: string;
  article_id: number;
  article_photo_url: string | null;
  category_name: string | null;
  comment: string | null;
  comment_created_at: string | null;
}[];

type ARTICLES_DATA_AND_PAGINATION = {
  data: ARTICLES_DATA;
  pagination: {
    totalPages: number;
    paginationMaxCount: number;
  };
};

type ARTICLE_DATA = {
  data: {
    article_id: number;
    article_photo_url: string | null;
    category_name: string | null;
    created_at: string;
    letter_body: string;
    title: string;
    user_id: number;
    user_photo_url: string;
    username: string;
  }[];
  comments: {
    user_comment: string | null;
    comment_created_at: string | null;
    username: string;
    user_photo_url: string;
  }[];
};

// 下書き記事をデータベース(draft_articles)から取得する際に使用する型。UserArticleListページで使用。
// ※article_idはデータベース(draft_articles)に対し、データ挿入時に自動で付与されるので
//   JavaScript側では定義する必要はない？
type DRAFT_ARTICLES_DATA = {
  data: {
    user_id: number;
    username: string;
    user_photo_url: string;
    article_id: number;
    title: string;
    letter_body: string | null;
    article_photo_url: string | null;
    created_at: string;
  };
};

// 公開記事をデータベース(articles)から取得する際に使用する型。UserArticleListページで使用。
// ※article_idはデータベース(articles)に対し、データ挿入時に自動で付与されるので
//   JavaScript側では定義する必要はない？
type PUBLIC_ARTICLES_DATA = {
  data: {
    user_id: number;
    username: string;
    user_photo_url: string;
    article_id: number;
    title: string;
    letter_body: string | null;
    article_photo_url: string | null;
    created_at: string;
  };
};

export type {
  ARTICLES_DATA,
  ARTICLES_DATA_AND_PAGINATION,
  ARTICLE_DATA,
  PUBLIC_ARTICLES_DATA,
  DRAFT_ARTICLES_DATA,
};
