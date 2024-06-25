import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Link, InputAdornment, IconButton, FormControl, Box, Alert, Checkbox, FormControlLabel  } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthLayout } from "../layout/AuthLayout";

import { Users } from "../helper/data";

const imageUrl = '/assets/dream_TradingCard.jpg'

export const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (!acceptPrivacyPolicy || !acceptTerms) {
      setError("Debes aceptar nuestros términos y condiciones y políticas de privacidad.");
      return;
    }

    const user = Users.find(user => user.email === email && user.password === password);

    if (user) {
      if (!user.existsInDB) {
        setError("El usuario no existe o la cuenta no existe.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/generate-code');
        }, 1000);
      }
    } else {
      console.log(email, password); // Para otros correos y contraseñas no estáticos
      setTimeout(() => {
        navigate('/generate-code');
      }, 1000);
    }
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
        {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
        {success && <Alert severity="success" sx={{mb: 2}}>Inicio de sesión exitoso.</Alert>}
        <FormControl fullWidth sx={{ mb: 2 }}>
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
                borderRadius: '4px',
                color: '#FEFCFB'
              }
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
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
                borderRadius: '4px',
                color: '#FEFCFB'
              }
            }}
          />
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptPrivacyPolicy}
              onChange={(e) => setAcceptPrivacyPolicy(e.target.checked)}
              color="secondary"
            />
          }
          label={
            <Typography variant="body2" color="#FEFCFB">
              Acepto las <Link href="/privacy-policy" color="inherit">políticas de privacidad</Link>
            </Typography>
          }
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              color="secondary"
            />
          }
          label={
            <Typography variant="body2" color="#FEFCFB">
              Acepto los <Link href="/terms-and-conditions" color="inherit">términos y condiciones</Link>
            </Typography>
          }
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Iniciar sesión
        </Button>
        <Link href="/register" underline="hover" sx={{ mt: 2 }} color='white'>
          <Typography variant="body2" color='white'>
            ¿No tienes cuenta? Crea una aquí.
          </Typography>
        </Link>
        <Link href="/social-media" underline="hover" color='white'>
          <Typography variant="body2" color='white'>
            Síguenos en nuestras redes
          </Typography>
        </Link>
      </Box>
    </AuthLayout>
  )
}
