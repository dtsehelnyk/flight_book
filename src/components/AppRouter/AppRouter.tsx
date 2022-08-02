import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { privateRoutes, publicRoutes } from '../../routes';

interface Props {
  isAuth?: boolean;
}

const Container = styled(Box)(({ theme }) => ({
  padding: '16px',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

const AppRouter: FC<Props> = ({ isAuth = false }) => {
  return (
    <Container>
      {
        isAuth ? (
          <Routes>
            {privateRoutes.map(({ path, Component }, i) => 
              <Route path={path} element={Component} key={i} />
            )}
          </Routes>
        ) : (
          <Routes>
            {publicRoutes.map(({ path, Component }, i) => 
              <Route path={path} element={Component} key={i} />
            )}
          </Routes>
        )
      }
    </Container>
  );
}

export default AppRouter;