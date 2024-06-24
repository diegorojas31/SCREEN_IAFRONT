import { FormEvent, useState } from "react";

import { TextField, Button, Typography, Link, InputAdornment, IconButton, FormControl, Box  } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthLayout } from "../layout/AuthLayout";
import { useNavigate } from "react-router-dom";

const imageUrl = '/assets/dream_TradingCard.jpg'

export const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError(true);
      return;
    }
    // Aquí puedes agregar lógica para manejar el envío del formulario
    // Por ejemplo, realizar una petición POST al backend
    console.log(email, password);
    navigate('/');
  };

  return (
    <AuthLayout imageUrl={imageUrl}>
      <Box component="form" onSubmit={handleSubmit} sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '360px',
        p: 3,
      }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#FEFCFB' }}>
          Iniciar sesión
        </Typography>
        <FormControl fullWidth error={error} sx={{ mb: 2 }}>
          <TextField
            label="Usuario o correo electrónico"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
              style: {
                borderRadius: '4px', // Bordes redondeados para el input
                color: '#FEFCFB' // Texto blanco para contraste
              }
            }}
          />
        </FormControl>
        <FormControl fullWidth error={error} sx={{ mb: 2 }}>
          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: '4px', // Bordes redondeados para el input
                color: '#FEFCFB' // Texto blanco para contraste
              }
            }}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Iniciar sesión
        </Button>
        <Link href="/register" underline="hover" sx={{ mt: 2 }}>
          <Typography variant="body2">
            ¿No tienes cuenta? Crea una aquí.
          </Typography>
        </Link>
        <Link href="/social-media" underline="hover">
          <Typography variant="body2">
            Síguenos en nuestras redes
          </Typography>
        </Link>
      </Box>
    </AuthLayout>
  )
}
