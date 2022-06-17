import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useArticlesByCreatedAt } from "hooks/components/articles/useArticlesByCreatedAt";

const theme = createTheme();

const ArticlesByCreatedAt = () => {
  const { articlesByCreatedAtData } = useArticlesByCreatedAt();

  return (
    <>
      <ThemeProvider theme={theme}>
        <main>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {articlesByCreatedAtData[0] &&
                articlesByCreatedAtData.map((article) => (
                  <Grid item key={article.article_id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          article.article_photo_url
                            ? article.article_photo_url
                            : "https://source.unsplash.com/random"
                        }
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {article.title}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
};

export default ArticlesByCreatedAt;
