type ARTICLE_DATA = {
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

// 公開記事、下書き記事をデータベース(articles,draft_articles)から取得する際に使用する型。
// UserArticleListページで使用。
type ARTICLES_DATA_FOR_USER_ARTICLE_LIST = {
  article_id: number;
  article_photo_url: string | null;
  created_at: string;
  letter_body: string;
  public: number;
  title: string;
  user_id: number;
  user_photo_url: string;
  username: string;
}[];

// 公開記事、下書き記事をデータベース(articles)から取得する際に使用する型。
// UserArticleListページで使用。
type ARTICLE_DATA_FOR_USER_ARTICLE_LIST = {
  article_id: number;
  article_photo_url: string | null;
  created_at: string;
  letter_body: string;
  public: number;
  title: string;
  user_id: number;
  user_photo_url: string;
  username: string;
};

type ARTICLES_DATA_AND_PAGINATION_FOR_USER_ARTICLE_LIST = {
  data: ARTICLES_DATA_FOR_USER_ARTICLE_LIST;
  pagination: {
    totalPages: number;
    paginationMaxCount: number;
  };
};

// 記事データベース(articles)から下書き記事のデータを取得する際に使用する型。
// UserArticlePostページで使用。
type DRAFT_ARTICLE_DATA_FOR_USER_ARTICLE_LIST = {
  article_id: number;
  article_id_of_storage: string | null;
  article_photo_url: string | null;
  created_at: string;
  file_names: string | null;
  images_url: string | null;
  letter_body: string;
  public: number;
  title: string;
  user_id: number;
  user_photo_url: string;
  username: string;
};

export type {
  ARTICLE_DATA,
  ARTICLES_DATA,
  ARTICLES_DATA_AND_PAGINATION,
  ARTICLES_DATA_FOR_USER_ARTICLE_LIST,
  ARTICLES_DATA_AND_PAGINATION_FOR_USER_ARTICLE_LIST,
  ARTICLE_DATA_FOR_USER_ARTICLE_LIST,
  DRAFT_ARTICLE_DATA_FOR_USER_ARTICLE_LIST,
};
