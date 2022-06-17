import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
const ArticlesOrganisms = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id=""
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ArticlesOrganisms;
