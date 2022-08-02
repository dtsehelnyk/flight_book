import { createContext, useContext, useMemo, useState } from 'react';
import { Box, createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDesignTokens } from './themes/palettes';
import './App.css';

import AppRouter from './components/AppRouter';
import Sidebar from './components/Sidebar';
import CircularProgress from '@mui/material/CircularProgress';
import PageLoader from './components/PageLoader';


export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState<PaletteMode>('dark');
  // const isAuth = false;
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  if (loading) return <PageLoader bgColor={theme.palette.background.paper} />

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, display: 'flex', minHeight: '100vh' }}>
          <Sidebar isAuth={false} />
          <AppRouter isAuth={!!user} />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
