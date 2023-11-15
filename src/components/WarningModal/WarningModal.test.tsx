import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { WarningModal, WarningModalProps } from './WarningModal';

describe('WarningModal Component', () => {
  const defaultProps: WarningModalProps = {
    open: true,
    onClose: jest.fn(),
    contentText: 'Warning message',
    buttonText: 'Close',
  };

  it('renders default button text if buttonText is not provided', () => {
    const { getByText } = render(
      <WarningModal open onClose={() => {}} contentText="Test content" />
    );

    expect(getByText('Okey')).toBeInTheDocument();
  });

  it('renders dialog content and button', () => {
    const { getByText } = render(<WarningModal {...defaultProps} />);

    const contentElement = getByText(defaultProps.contentText);
    expect(contentElement).toBeInTheDocument();

    const buttonElement = getByText(defaultProps.buttonText!);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClose function when the button is clicked', () => {
    const { getByText } = render(<WarningModal {...defaultProps} />);

    const buttonElement = getByText(defaultProps.buttonText!);
    fireEvent.click(buttonElement);

    expect(defaultProps.onClose).toHaveBeenCalledWith(false);
  });
});
