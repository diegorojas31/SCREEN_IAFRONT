// import { Box, Typography, CircularProgress } from '@mui/material';
import { Step, Stepper as MUIStepper, StepLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface StepperProps {
    currentStep: number;
    totalSteps: number;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
    const theme = useTheme();

    return (
        <MUIStepper activeStep={currentStep - 1} alternativeLabel sx={{ width: '100%' }}>
        {Array.from({ length: totalSteps }, (_, i) => (
            <Step key={i}  completed={currentStep > i + 1}>
            <StepLabel
                sx={{
                    '.MuiStepIcon-root': { // Estilos para el ícono del paso (círculo)
                      color: currentStep === i + 1 ? theme.palette.primary.main : theme.palette.grey[800], // Paso activo en color primario, otros en gris
                      '&.Mui-completed': { // Estilos para pasos completados
                        color: '#9370DB', // Cambiar el color para pasos completados
                      }
                    },
                    '.MuiStepLabel-label': { // Estilos para la etiqueta del paso
                      color: currentStep === i + 1 ? 'inherit' : theme.palette.grey[800], // El color de las etiquetas
                    }
                  }}
            >
                Paso {i + 1}
            </StepLabel>
            </Step>
        ))}
        </MUIStepper>
    );

};
