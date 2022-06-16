
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const theme = createTheme({
  palette: {
    background: {
      default: "#0A1929"
    },
    text: {
      primary: "#b2bac2"
    }
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
          <Box sm={{ width: 500, minHeight: 393 }}>
            <Masonry columns={5} spacing={2}>
              {heights.map((height, index) => (
                <Item key={index} sx={{ height }}>
                  {index + 1}
                </Item>
              ))}
            </Masonry>
          </Box>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
