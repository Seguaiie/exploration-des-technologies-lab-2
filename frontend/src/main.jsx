import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
import './styles.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#5b4ae8' },
    secondary: { main: '#12a594' },
    background: { default: '#f4f3fb' }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h3: { fontWeight: 800, letterSpacing: '-0.04em' },
    button: { fontWeight: 700, textTransform: 'none' }
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 12 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
