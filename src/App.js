
import { ThemeProvider } from '@emotion/react';
import React, { useEffect, useState} from 'react';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ListThought from './component/ListThought';
import ThoughtService from "./services/ThoughtService";

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

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
            {allThought}
        </React.Fragment>
      </ThemeProvider>
    );
}

export default App;
