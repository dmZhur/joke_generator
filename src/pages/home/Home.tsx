import React, { useEffect, useState, FC } from 'react';
import { withRouter } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import { NavigationButton } from '../../components/NavigationButton';
import { MainWrapper } from '../../components/MainWrapper';
import { WarningModal } from '../../components/WarningModal';
import { useAppSelector, useAppDispatch } from '../../store';
import {
  fetchJokes,
  addJoke,
  addToFavorites,
  removeFromFavorites,
} from '../../store/features/jokeSlice';
import Joke from '../../interfaces/joke';
import logo from '../../assets/images/chucknorris_logo.png';
import { messages } from '../../constants/messages';

const useStyles = makeStyles(
  () => ({
    wrap: {
      width: '100%',
    },
    list: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#ebebeb',
        borderTop: '1px solid #767676',
        borderBottom: '1px solid #767676',
      },
    },
    controls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    logo: {
      height: '219px',
    },
  }),
  { name: 'JokeList' }
);

const HomePage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const jokes = useAppSelector((state) => state.jokes);
  const favoritesIds = jokes.favorites?.map((joke) => joke.id);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  const addToFavoritesHandler = (joke: Joke) => {
    if (jokes.favorites?.length > 9) {
      setOpen(true);
      return;
    }
    dispatch(addToFavorites({ joke: joke }));
  };
  const removeHandler = (joke: Joke) => {
    dispatch(removeFromFavorites({ joke: joke }));
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      dispatch(addJoke());
    }, 5000);

    if (!checked) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [checked, dispatch]);

  useEffect(() => {
    if (!jokes.jokes?.length) {
      dispatch(fetchJokes());
    }
  }, []);

  return (
    <>
      <MainWrapper>
        <Box className={classes.logo}>
          <img src={logo} alt="Logo" />
        </Box>
        <Box className={classes.controls}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="Fetch a new joke every 5 seconds"
          />
          <NavigationButton
            pathTo="/joke_generator/favorites"
            text="Go to favorites"
            variant="contained"
          />
        </Box>
        <List className={classes.wrap}>
          {jokes.jokes?.map((item: Joke) => {
            return (
              <ListItem
                className={classes.list}
                key={item.id}
                secondaryAction={
                  <IconButton
                    data-testid="icon-button"
                    onClick={() =>
                      favoritesIds.includes(item.id)
                        ? removeHandler(item)
                        : addToFavoritesHandler(item)
                    }
                  >
                    {favoritesIds.includes(item.id) ? (
                      <StarIcon />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButton>
                }
              >
                <ListItemText primary={item.value} />
              </ListItem>
            );
          })}
        </List>
      </MainWrapper>
      <WarningModal
        open={open}
        onClose={setOpen}
        contentText={messages.warning}
      />
    </>
  );
};

export default withRouter(HomePage);
