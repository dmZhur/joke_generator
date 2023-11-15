import React from 'react';
import { render } from '@testing-library/react';
import { MainWrapper } from './MainWrapper';

describe('MainWrapper Component', () => {
  it('renders children inside MainWrapper component', () => {
    const { getByTestId, container } = render(
      <MainWrapper>
        <div data-testid="child">Test content</div>
      </MainWrapper>
    );

    const childElement = getByTestId('child');

    expect(container).toContainElement(childElement);
  });
});
