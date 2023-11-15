import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavigationButton, NavigationButtonProps } from './NavigationButton';

describe('NavigationButton Component', () => {
  const defaultProps: NavigationButtonProps = {
    pathTo: '/example',
    text: 'Example',
  };

  it('renders NavigationButton with correct text and path', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavigationButton {...defaultProps} />
      </MemoryRouter>
    );

    const buttonElement = getByText(defaultProps.text);
    expect(buttonElement).toBeInTheDocument();

    const linkElement = buttonElement.closest('a');
    expect(linkElement).toHaveAttribute('href', defaultProps.pathTo);
  });
});
