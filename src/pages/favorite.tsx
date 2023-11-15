import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { NavigationButton } from '../components/NavigationButton';
import { MainWrapper } from '../components/MainWrapper';
import { useAppSelector, useAppDispatch } from '../store';
import { removeFromFavorites } from '../store/features/jokeSlice';
import Joke from '../interfaces/joke';

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
    nav: {
      width: '100%',

      '& a': {
        float: 'right',
      },
    },
  }),
  { name: 'FavoritesJokeList' }
);

const FavoritePage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const jokes = useAppSelector((state) => state.jokes);

  const removeHandler = (joke: Joke) => {
    dispatch(removeFromFavorites({ joke: joke }));
  };

  return (
    <MainWrapper>
      <Typography variant="h3">Favorites jokes list</Typography>
      <Box className={classes.nav}>
        <NavigationButton
          pathTo="/"
          text="Go to the home page"
          variant="contained"
        />
      </Box>
      <List className={classes.wrap}>
        {jokes.favorites?.map((item: Joke, index: number) => {
          return (
            <ListItem
              className={classes.list}
              key={`${item.id}${index}`}
              secondaryAction={
                <IconButton
                  data-testid="icon-button"
                  onClick={() => removeHandler(item)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={item.value} />
            </ListItem>
          );
        })}
      </List>
    </MainWrapper>
  );
};

export default withRouter(FavoritePage);
