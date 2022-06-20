
import { ThemeProvider } from '@emotion/react';
import React, { useEffect, useState} from 'react';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ListThought from './component/ListThought';
import ThoughtService from "./services/ThoughtService";
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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

  useEffect(() => {
    getThought()
  }, [])

  const [thoughts, setThoguhts] = useState([])

  const getThought = () => {
      ThoughtService.getAll()
          .then(res => {
              setThoguhts(res.data)
          })
          .catch(e => {
              console.log(e)
          })
  }

  const allThought = thoughts.map(item => {
    return (
      <ListThought key={item.id} item={item} />
    )
  })

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    padding: theme.spacing(2110),
    textAlign: 'center',
    color: '#fff',
  }));

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
            {/* {allThought} */}

            <Box sm={{ width: 500, minHeight: 393 }}>
              <Masonry columns={4} spacing={2}>
                {thoughts.map((item, index) => (
                  <Item key={index} sx = { 150 }>
                    {item.title}
                    {item.content}
                  </Item>
                ))}
              </Masonry>
            </Box>
        </React.Fragment>
      </ThemeProvider>
    );
}

export default App;
