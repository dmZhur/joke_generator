import React, { FC } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

export interface NavigationButtonProps extends ButtonProps {
  pathTo: string;
  text: string;
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'inline-block',
      margin: '10px 0px',
    },
  }),
  { name: 'NavigationButton' }
);

export const NavigationButton: FC<NavigationButtonProps> = ({
  pathTo,
  text,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Link to={pathTo} className={classes.root}>
      <Button {...props}>{text}</Button>
    </Link>
  );
};
