import { FC, useContext } from 'react';
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Switch,
  useTheme,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirIcon from '@mui/icons-material/Air';
import TimerIcon from '@mui/icons-material/Timer';
import InsightsIcon from '@mui/icons-material/Insights';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../../App';
import firebase from 'firebase/compat/app';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
  isAuth?: boolean;
}

const Sidebar: FC<Props> = ({ isAuth = false }) => {
  const theme = useTheme();
  const themeSwitcher = useContext(ColorModeContext);
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    console.log(user);
  }

  return (
    <Box
      sx={{
        width: 200,
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        color: theme.palette.text.primary,
      }}
    >
      <MenuList style={{ position: 'fixed' }}>
        <Link to='./clock'>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>User</ListItemText>
          </MenuItem>
        </Link>

        <Divider />

        <Link to='./clock'>
          <MenuItem>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText>Clock</ListItemText>
          </MenuItem>
        </Link>

        <Link to='./breathing'>
          <MenuItem>
            <ListItemIcon>
              <AirIcon />
            </ListItemIcon>
            <ListItemText>Breathing</ListItemText>
          </MenuItem>
        </Link>

        <Link to='./stats'>
          <MenuItem>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText>Stats</ListItemText>
          </MenuItem>
        </Link>

        <Link to='./progress'>
          <MenuItem>
            <ListItemIcon>
              <InsightsIcon />
            </ListItemIcon>
            <ListItemText>Progress</ListItemText>
          </MenuItem>
        </Link>

        <Link to='./articles'>
          <MenuItem>
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText>Articles</ListItemText>
          </MenuItem>
        </Link>

        <MenuItem>
          <Switch checked={theme.palette.mode === 'dark'} onClick={() => themeSwitcher.toggleColorMode()}/>
          <ListItemText primary={'Dark mode'} />
        </MenuItem>
        <Divider />

        {user ? (
          <MenuItem onClick={() => auth.signOut()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem onClick={login}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText>Log in</ListItemText>
          </MenuItem>
        )}
      </MenuList>
    </Box>
  )
}

export default Sidebar;