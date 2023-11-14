import React, { FC, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  () => ({
    root: {
      maxWidth: 1024,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  }),
  { name: 'MainWrapper' }
);

export const MainWrapper: FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles();

  return <Box className={classes.root}>{children}</Box>;
};
