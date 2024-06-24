import { FormEvent } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { Box, Button, Typography } from '@mui/material';

import { CardElementContainer } from './CardElementContainer';
import { CardLayout } from '../layout/CardLayout';
import { Stepper } from './Stepper';

const CARD_OPTIONS = {
    style: {
      base: {
        color: "black",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "14px",
        "::placeholder": {
          color: "#aab7c4"
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
};

interface CardComponentProps {
    prevStep: () => void;
    onSuccessfulPayment: (paymentMethodId: string) => void;
    currentStep: number;
}

export const CardComponent = ({ prevStep, onSuccessfulPayment, currentStep }: CardComponentProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const totalSteps = 2;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe.js has not loaded yet.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement
            });

            if (error) {
                console.error('[error]', error);
            } else if (paymentMethod) {
                onSuccessfulPayment(paymentMethod.id);  // Callback al padre con el ID del método de pago
            }
        } else {
            console.log("Card Element is not available.");
        }
    };

    return (
        <CardLayout>
            <Box sx={{ width: '100%' }}>
                <Stepper currentStep={currentStep} totalSteps={totalSteps} />
                <Box component="form" onSubmit={handleSubmit} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    p: 3
                    }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        La información de su tarjeta se recopila para verificar la autenticidad y permitir 
                        los cobros necesarios al terminar su prueba gratuita. Nos tomamos muy en serio la seguridad 
                        de su información.
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Información de Tarjeta
                    </Typography>
                    <CardElementContainer>
                        <CardElement options={CARD_OPTIONS}/>
                    </CardElementContainer>
                    <Box sx={{ marginTop: 2 }}>
                        <Button 
                            type="button" 
                            onClick={prevStep} 
                            sx={{
                                mr: 2,
                                bgcolor: 'secondary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'secondary.dark',
                                    color: 'white',
                                }
                            }}
                        >
                            Volver
                        </Button>
                        <Button 
                            type="submit" 
                            variant="contained"
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                    color: 'white',
                                }
                            }}
                        >
                            Finalizar Registro
                        </Button>
                    </Box>
                </Box>
            </Box>
        </CardLayout>
        
    );
};