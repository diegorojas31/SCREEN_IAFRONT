import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';

const globalStyles = (
  <GlobalStyles styles={{
    'input[type="password"]::-ms-reveal': {
      display: 'none'
    },
    'input[type="password"]::-webkit-credentials-auto-fill-button': {
      visibility: 'hidden',
      position: 'absolute',
      right: '-9999px'
    }
  }} />
);

const theme = createTheme({
  palette: {
    mode: 'light', // Modo claro
    primary: {
      main: '#4b4b8f',  // Tono de púrpura oscuro
      light: '#757abf', // Tono de púrpura más claro para resaltes
      dark: '#3d3d73',  // Tono de púrpura oscuro más intenso para estados activos
    },
    secondary: {
      main: '#212121',  // Negro para elementos secundarios y fondos
      light: '#484848', // Tono más claro de negro
      dark: '#000000',  // Negro puro
    },
    error: {
      main: '#D32F2F',  // Rojo para errores y alertas
    },
    warning: {
      main: '#FFA000',  // Naranja para advertencias
    },
    info: {
      main: '#1976D2',  // Azul para información
    },
    success: {
      main: '#388E3C',  // Verde para éxito
    },
    background: {
      default: '#F5F5F5',  // Fondo claro por defecto
      paper: '#FFFFFF',    // Fondo de papel blanco
    },
    text: {
      primary: '#212121',  // Texto principal en negro
      secondary: 'rgba(0, 0, 0, 0.7)',  // Texto secundario en negro translúcido
      disabled: 'rgba(0, 0, 0, 0.5)',  // Texto deshabilitado en negro translúcido
    },
    divider: '#BDBDBD', // Color del divisor
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
    },
  },
});

// Definir las propiedades esperadas por AppTheme
interface AppThemeProps {
  children: ReactNode; // Esto asegura que children puede ser cualquier elemento React válido
}

export const AppTheme = ({ children }: AppThemeProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      {children}
    </ThemeProvider>
  );
}
