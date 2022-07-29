const config = {
  BACKEND_URL:
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api/v1',
  PUBLIC_OR_NOTPUBLIC_COMMENT: 'このコメントは投稿者により削除されました。',
  SLACK_URL: process.env.REACT_APP_ADMIN_URL || '',
};

export { config };
