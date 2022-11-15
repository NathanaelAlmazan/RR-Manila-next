import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#0078AA',
    },
    secondary: {
      main: '#F2DF3A',
    },
    error: {
      main: '#f76c6c',
    },
    warning: {
      main: '#f8e9a1',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 300,
      fontSize: 18
    },
    subtitle2: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;