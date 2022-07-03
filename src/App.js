import { ThemeProvider } from '@emotion/react';
import React, { useEffect, useState} from 'react';
import { createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ThoughtService from "./services/ThoughtService";
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



const theme = createTheme({
  palette: {
    background: {
      default: "#0A1929",
      margin: "10px"
    },
    text: {
      primary: "#b2bac2"
    }
  }
});

const StyledTextField = styled(TextField)({
  "& label": {
    color: "#e8eaed"
  },
  // "&:hover label": {
  //   fontWeight: 700
  // },
  "& label.Mui-focused": {
    color: "#e8eaed"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#e8eaed"
  },
  "& .MuiInput-root:before": {
    borderBottomColor: "#e8eaed"
  },
  "& .MuiInputBase-root": {
    "& fieldset": {
      borderColor: "#e8eaed"
    },
    "&:hover fieldset": {
      borderColor: "#e8eaed",
      borderWidth: 2
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e8eaed"
    }
  }
});

function App() {

  useEffect(() => {
    getThought()
  }, [])

  const initialThoughtSate = {
    title: "",
    content: "",
    publish: true
  } 

  function handleDelete(id, event){
    let confirm = window.confirm("Are you sure?")
    if(confirm === true){
        ThoughtService.remove(id)
        .then(res => {
            if(res.status === 200){
                getThought()
            }
        })
        .catch(e => {
            console.log(e)
        })
    }
  }

  const [thoughts, setThoguhts] = useState([])
  //const [open, setOpen] = React.useState(false)
  const [newThought, setNewThought] = useState(initialThoughtSate)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = event => {
    const{name, value, type, checked} = event.target
    const isPublish = event.currentTarget.value === 'true' ? true : false
    setNewThought(prevFormData => {
        return {
            ...prevFormData,
            [name] : value,
            publish: isPublish
        }
    })
  }

  const getThought = () => {
      ThoughtService.getAll()
          .then(res => {
              setThoguhts(res.data)
          })
          .catch(e => {
              console.log(e)
          })
  }

  // const handleFormOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    ThoughtService.create(newThought)
        .then(res => {
            if(res.status === 200){
              setNewThought({
                title: "",
                content: ""
              })  

              getThought()
              // thoughts({
              //     title: res.data.title,
              //     content: res.data.content
              // })
              //setSubmitted(true);
                console.log(res.data);
            }
        })
        .catch(e => {
            console.log(e)
        })
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    //textAlign: 'center',
    color: '#e8eaed',
    border: '1px solid #fff',
    position: 'relative'
  }))

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
            {/* {allThought} */}
            <Box sx={{m: 'auto', width: '40%', p: 2 }}>
              {/* <Button variant="outlined" onClick={handleFormOpen} style={{alignItems: 'center', width: 'auto'}}>
                Open form dialog
              </Button>  */}

              <form onSubmit={handleSubmit} autoComplete='off'>
                <StyledTextField 
                    margin="dense"
                    id="title"
                    label="Title"
                    value={newThought.title}
                    onChange={handleInputChange}
                    name="title"
                    fullWidth
                    variant="standard"
                />

                <StyledTextField
                  margin="dense"
                  id="content"
                  label="My Thought"
                  value={newThought.content}
                  onChange={handleInputChange}
                  name="content"
                  fullWidth
                  variant="standard"
                  multiline
                />
                <Button 
                  sx={{
                    "&.MuiButton-text": {
                      color: "white", 
                      //justifyContent: "left", 
                      //paddingLeft: "0"
                    }}} 
                    type='submit'>Add</Button>
                {/* <Button onClick={handleClose}>Cancel</Button> */}
              </form>

            </Box>
            <Box sx={{m: 4, alignItems: 'center', width: 'auto'}}>    

              {/* <Dialog open={open} 
                onClose={handleClose} 
                PaperProps={{
                  style: {
                    backgroundColor: "#0A1929",
                    padding: "20px"
                  },
                }}
              >
                <DialogTitle>Add</DialogTitle>
                
                  <form onSubmit={handleSubmit}>
                    <TextField 
                        margin="dense"
                        id="title"
                        label="Title"
                        value={newThought.title}
                        onChange={handleInputChange}
                        name="title"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                        color="primary"
                    />

                    <TextField
                      margin="dense"
                      id="content"
                      label="My Thought"
                      value={newThought.content}
                      onChange={handleInputChange}
                      name="content"
                      fullWidth
                      variant="standard"
                      autoComplete='off'
                      multiline
                    />
                    <Button type='submit'>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                  </form>
              </Dialog> */}

                        

              <Box sm={{ width: 500, minHeight: 393, padding: 15 }}>
                <Masonry columns={4} spacing={2}>
                  {thoughts.map((thought, index) => (
                    <Item key={index} sx = { 150 }>
                      <h2 style={{fontSize: '16px', fontWeight: 'bold'}}> 
                        {thought.title}
                      </h2>
                      {thought.content}
                      
                        <Button
                          id="demo-positioned-button"
                          aria-controls={open ? "demo-positioned-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <MoreVertIcon 
                            sx={{ 
                              color: "white"
                              }} 
                          />
                        </Button>

                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          getContentAnchorEl={null}
                          anchorOrigin={{ vertical: 'bottom',horizontal: 'left' }} 
                          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                          <MenuItem onClick={(e) => handleDelete(thought.id, e)}>Delete</MenuItem>
                        </Menu>
                        
                    </Item>
                  ))}
                </Masonry>
              </Box>
              
            </Box>
        </React.Fragment>
      </ThemeProvider>
    );
}

export default App;
