type ARTICLES_DATA = {
  username: string;
  user_photo_url: string;
  user_id: number;
  title: string;
  letter_body: string;
  created_at: string;
  article_id: number;
  article_photo_url: null | string;
  category_name: null | string;
  comment: null | string;
  comment_created_at: null | string;
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
    article_photo_url: null | string;
    category_name: null | string;
    created_at: string;
    letter_body: string;
    title: string;
    user_id: number;
    user_photo_url: string;
    username: string;
  }[];
  comments: {
    user_comment: null | string;
    comment_created_at: null | string;
    username: string;
    user_photo_url: string;
  }[];
};

type DRAFT_ARTICLES_DATA = {
  data: {
    article_id: number;
    article_photo_url: null | string;
    category_name: null | string;
    created_at: string;
    letter_body: string | null;
    title: string;
    user_id: number;
    user_photo_url: string;
    username: string;
  };
};

export type {
  ARTICLES_DATA,
  ARTICLES_DATA_AND_PAGINATION,
  ARTICLE_DATA,
  DRAFT_ARTICLES_DATA,
};
