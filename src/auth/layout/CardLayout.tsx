import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface CardLayoutProps {
  children: ReactNode;
}

export const CardLayout = ({ children }: CardLayoutProps) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1c1c2e 0%, #2e2e4f 50%, #3b3b73 100%)', // Degradado de azul a morado apagado/negro azulado
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',  // Cambiado a columna para acomodar el nuevo div
        width: '70%',
        height: 'auto',  // Cambiado a auto para ajustar al contenido
        boxShadow: 3,
        backgroundColor: 'linear-gradient(90deg, #3b3b73 0%, #ff7f50 100%)',
        borderRadius: 2,
        '@media (max-width: 600px)': {
          width: '90%', // Más ancho en pantallas pequeñas
          minHeight: '350px'
        },
        '@media (min-width: 601px) and (max-width: 1200px)': {
          width: '80%', // Ancho moderado en pantallas medianas
          minHeight: '450px'
        },
        '@media (min-width: 1201px)': {
          width: '45%', // Ancho estándar en pantallas grandes
          maxWidth: '960px', // Límite máximo para pantallas muy grandes
          minHeight: '500px'
        },
      }}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4b4b8f',  // Morado apagado para contraste
          color: '#FEFCFB', // Texto blanco para contraste
          padding: '20px',
          borderRadius: '4px 0 0 0'  // Redondea solo los bordes superiores izquierdos
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
