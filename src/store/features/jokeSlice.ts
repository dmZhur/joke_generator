import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Joke from '../../interfaces/joke';

interface JokeState {
  jokes: Joke[];
  favorites: Joke[];
}

const initialState: JokeState = {
  jokes: [],
  favorites: [],
};

export const fetchJokes = createAsyncThunk('jokes/fetch', async (thunkAPI) => {
  const response = await fetch(
    'https://api.chucknorris.io/jokes/search?query=dev',
    {
      method: 'GET',
    }
  );
  const data = response.json();
  return data;
});

export const addJoke = createAsyncThunk('joke/fetch', async (thunkAPI) => {
  const response = await fetch('https://api.chucknorris.io/jokes/random', {
    method: 'GET',
  });
  const data = response.json();
  return data;
});

export const JokeSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<{ joke: Joke }>) => {
      state.favorites = [...(state.favorites || []), action.payload.joke];
    },
    removeFromFavorites: (state, action: PayloadAction<{ joke: Joke }>) => {
      const newList = state.favorites.filter(
        (joke) => joke.id !== action.payload.joke.id
      );

      state.favorites = [...newList];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJokes.fulfilled, (state, action) => {
      // shuffle array
      const shuffled = action.payload.result?.sort(() => 0.5 - Math.random());

      // Get first 10 elements after shuffled
      state.jokes = shuffled?.length ? shuffled.slice(0, 10) : [];
    });
    builder.addCase(addJoke.fulfilled, (state, action) => {
      if (state.jokes && state.jokes?.length > 9) {
        const clone = [...(state.jokes || [])];
        clone?.splice(-1, 1);

        state.jokes = [action.payload, ...clone];
        return;
      }
      state.jokes = [action.payload, ...(state.jokes || [])];
    });
  },
});

export default JokeSlice.reducer;

export const { addToFavorites, removeFromFavorites } = JokeSlice.actions;
