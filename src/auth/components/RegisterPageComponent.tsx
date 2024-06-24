import { ChangeEvent, FormEvent, useState } from "react";

import { Box, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { AuthLayout } from "../layout/AuthLayout";
import { Stepper } from "./Stepper";

type FormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
};

interface RegisterPageComponentProps {
    nextStep: () => void;
    handleChange: (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: FormData;
    currentStep: number;
}

const imageUrl = '/assets/dream_TradingCard.jpg';

export const RegisterPageComponent: React.FC<RegisterPageComponentProps>  = ({ nextStep, handleChange, formData, currentStep }) => {
  
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const totalSteps = 2;
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleLocalChange = (key: keyof FormData) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        handleChange(key)(event);
    };

    const handleNext = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        nextStep();
        
    };
  
    return (
      <AuthLayout imageUrl={imageUrl}>
        <Box sx={{ width: '100%' }}>
            <Stepper currentStep={currentStep} totalSteps={totalSteps} />
            <Box component="form" onSubmit={handleNext} sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '360px',
                p: 3
            }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Crear cuenta
                </Typography>
                <TextField
                    label="Nombre completo"
                    variant="outlined"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <AccountCircleIcon />
                            </InputAdornment>
                        ),
                        style: {
                            color: '#FEFCFB'
                        }
                    }}
                    value={formData.fullName}
                    onChange={handleLocalChange('fullName')}
                />
                <TextField
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <EmailIcon />
                            </InputAdornment>
                        ),
                        style: {
                            color: '#FEFCFB'
                        }
                    }}
                    value={formData.email}
                    onChange={handleLocalChange('email')}
                />
                <TextField
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
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
                            color: '#FEFCFB'
                        }
                    }}
                    value={formData.password}
                    onChange={handleLocalChange('password')}
                />
                <TextField
                    label="Confirmar contraseña"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
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
                            color: '#FEFCFB'
                        }
                    }}
                    value={formData.confirmPassword}
                    onChange={handleLocalChange('confirmPassword')}
                />
                <TextField
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <PhoneIcon />
                            </InputAdornment>
                        ),
                        style: {
                            color: '#FEFCFB'
                        }
                    }}
                    value={formData.phone}
                    onChange={handleLocalChange('phone')}
                />
                
                <Button 
                    type="submit" 
                    variant="contained"
                    color="primary" 
                    fullWidth
                    sx={{mt: 2}}
                >
                    Siguiente Paso
                </Button>
                <Link href="/login" underline="hover" sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                    ¿Ya tienes una cuenta? Inicia sesión aquí.
                    </Typography>
                </Link>
            </Box>
        </Box>
      </AuthLayout>
    )
};