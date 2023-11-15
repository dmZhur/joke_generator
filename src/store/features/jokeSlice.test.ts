import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, {
  JokeSlice,
  fetchJokes,
  addJoke,
  addToFavorites,
  removeFromFavorites,
} from './jokeSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('JokeSlice async extraReducers', () => {
  const initialState = {
    jokes: [],
    favorites: [],
  };

  it('should call createAsyncThunk jokes/fetch and update state correctly', async () => {
    const store = mockStore({});

    await store.dispatch<any>(fetchJokes());
    const actions = store.getActions();

    const action = {
      type: fetchJokes.fulfilled.type,
      payload: {
        result: [...actions[1].payload.result],
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      jokes: state.jokes,
      favorites: [],
    });
  });

  it('should call createAsyncThunk joke/fetch and update state correctly', async () => {
    const store = mockStore({});

    await store.dispatch<any>(addJoke());
    const actions = store.getActions();

    const action = {
      type: addJoke.fulfilled.type,
      payload: {
        result: [actions[1].payload],
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      jokes: state.jokes,
      favorites: [],
    });
  });

  it('should call createAsyncThunk joke/fetch and update state if jokes more then 10', async () => {
    const store = mockStore({});
    const joke = {
      categories: [],
      created_at: '2020-01-05 13:42:21.795084',
      icon_url: '',
      id: 'Jy-QrIsUQDuwG9uwAmu8rA',
      updated_at: '2020-01-05 13:42:21.795084',
      url: '',
      value: 'When Chuck Norris was 8, he and his friend.',
    };

    await store.dispatch<any>(addJoke());
    const actions = store.getActions();

    const action = {
      type: addJoke.fulfilled.type,
      payload: {
        result: [actions[1].payload],
      },
    };

    const state = reducer(
      {
        jokes: Array(10).map(() => joke),
        favorites: [],
      },
      action
    );

    expect(state).toEqual({
      jokes: state.jokes,
      favorites: [],
    });
  });
});

describe('JokeSlice async actions', () => {
  it('should dispatch fetchJokes and update state correctly', async () => {
    const store = mockStore({});
    await store.dispatch<any>(fetchJokes());
    const actions = store.getActions();
    const expectedActionTypes = [
      fetchJokes.pending.type,
      fetchJokes.fulfilled.type,
    ];

    expect(actions.map((action: any) => action.type)).toEqual(
      expectedActionTypes
    );
    expect(actions[1].payload.result[0]).toHaveProperty('id');
  });

  it('should dispatch addJoke and update state correctly', async () => {
    const store = mockStore({});
    await store.dispatch<any>(addJoke());
    const actions = store.getActions();
    const expectedActionTypes = [addJoke.pending.type, addJoke.fulfilled.type];

    expect(actions.map((action: any) => action.type)).toEqual(
      expectedActionTypes
    );
    expect(actions[1].payload).toHaveProperty('id');
  });
});

describe('JokeSlice reducers', () => {
  it('should handle addToFavorites', () => {
    const initialState = {
      jokes: [],
      favorites: [],
    };
    const joke = {
      categories: [],
      created_at: '2020-01-05 13:42:21.795084',
      icon_url: '',
      id: 'Jy-QrIsUQDuwG9uwAmu8rA',
      updated_at: '2020-01-05 13:42:21.795084',
      url: '',
      value: 'When Chuck Norris was 8, he and his friend.',
    };
    const newState = JokeSlice.reducer(initialState, addToFavorites({ joke }));

    expect(newState.favorites).toContainEqual(joke);
  });

  it('should handle removeFromFavorites', () => {
    const joke = {
      categories: [],
      created_at: '2020-01-05 13:42:21.795084',
      icon_url: '',
      id: 'rIsUQDuwG9uwAmu8rA',
      updated_at: '2020-01-05 13:42:21.795084',
      url: '',
      value: 'When Chuck Norris was 8, he and his friend.',
    };

    const initialState = {
      jokes: [],
      favorites: [joke],
    };

    const newState = JokeSlice.reducer(
      initialState,
      removeFromFavorites({ joke: joke })
    );

    expect(newState.favorites).not.toContainEqual(joke);
  });
});
