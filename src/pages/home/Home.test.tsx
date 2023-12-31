import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as utils from '../../store/features/jokeSlice';

import HomePage from './Home';

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

describe('HomePage Component', () => {
  const setup = (stateData: any) => {
    const Storage = mockStore(stateData);

    return render(
      <MemoryRouter>
        <Provider store={Storage}>
          <HomePage />
        </Provider>
      </MemoryRouter>
    );
  };

  it('renders HomePage component with mocked store', () => {
    const component = setup({
      jokes: {
        favorites: [],
        jokes: [joke],
      },
    });
    const titleElement = component.getByText(
      'Fetch a new joke every 5 seconds'
    );

    expect(titleElement).toBeInTheDocument();
  });

  it('adds joke to favorite', () => {
    const component = setup({
      jokes: {
        favorites: [],
        jokes: [joke],
      },
    });
    const spy = jest.spyOn(utils, 'addToFavorites');

    fireEvent.click(component.getByTestId('icon-button'));
    expect(spy).toHaveBeenCalled();
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
