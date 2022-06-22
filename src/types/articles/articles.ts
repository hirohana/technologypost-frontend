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

// ※article_idはデータベース(draftArticles)に対し、データ挿入時に自動で付与されるので
//   JavaScript側では定義する必要はない？
type DRAFT_ARTICLES_DATA = {
  data: {
    // article_id: number;
    article_photo_url: string | null;
    category_name: string | null;
    created_at: string | null;
    letter_body: string | null;
    title: string | null;
    user_id: number | null;
    user_photo_url: string | null;
    username: string | null;
  };
};

export type {
  ARTICLES_DATA,
  ARTICLES_DATA_AND_PAGINATION,
  ARTICLE_DATA,
  DRAFT_ARTICLES_DATA,
};
