import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as utils from '../../store/features/jokeSlice';

import FavoritePage from './Favorite';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const joke = {
  categories: [],
  created_at: '2020-01-05 13:42:21.795084',
  icon_url: '',
  id: 'QrIsUQDuwG9uwAmu8rA2',
  updated_at: '2020-01-05 13:42:21.795084',
  url: '',
  value: 'When Chuck Norris was 8, he and his friend.',
};

describe('FavoritePage Component', () => {
  const setup = (stateData: any) => {
    const Storage = mockStore(stateData);

    return render(
      <MemoryRouter>
        <Provider store={Storage}>
          <FavoritePage />
        </Provider>
      </MemoryRouter>
    );
  };

  it('renders FavoritePage component with mocked store', () => {
    const component = setup({
      jokes: {
        favorites: [joke],
        jokes: [],
      },
    });
    const titleElement = component.getByText('Favorites jokes list');

    expect(titleElement).toBeInTheDocument();
  });

  it('remove joke from favorite', () => {
    const component = setup({
      jokes: {
        favorites: [joke],
        jokes: [joke],
      },
    });
    const spy = jest.spyOn(utils, 'removeFromFavorites');

    fireEvent.click(component.getByTestId('icon-button'));
    expect(spy).toHaveBeenCalled();
  });
});
