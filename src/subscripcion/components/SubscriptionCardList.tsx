import { ReactNode, useState } from 'react';

import { Box, Button, Card, CardContent, Divider, List, ListItem, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

import { DialogInfo } from './DialogInfo';
import { TopLevel } from '../interfaces/prices.response';

interface SubscriptionCardListProps {
  prices: TopLevel[];
}

export const SubscriptionCardList = ({ prices }: SubscriptionCardListProps) => {
  // const theme = useTheme();

  const [dialogDescription, setDialogDescription] = useState<ReactNode>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<string>(''); 

  const handleClickOpen = (price: TopLevel) => {
    setSelectedPlan(price.id);

    const description = (
      <>
        ¿Estás seguro de escoger el plan {price.product.name}? 
        <br />
        Si aceptas, se descontará de tu tarjeta un monto de {price.unit_amount / 100} {price.currency.toUpperCase()} cada
        {
          (price.recurring.interval_count > 1) 
            ? ` ${price.recurring.interval_count} meses` 
            : ' mes' 
        }.

        <br /><br />
        <span style={{ fontSize: '0.85em' }}>Puedes cancelar esta suscripción en cualquier momento.</span>
      </>
    );

    setDialogDescription(description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log(`Plan confirmado: ${selectedPlan}`);
    setOpen(false);
  };

  const gradient2 = 'linear-gradient(to bottom, #2A0C4E , #5B3E92)';
  const gradient1 = 'linear-gradient(to bottom, #4b4b8f, #B8B8FF)';

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {prices.map((price, index) => (
         <Card
         key={price.id}
         style={{ 
          width: '350px',
          margin: '10px',
          background: index % 2 === 0 ? gradient1 : gradient2,
          color: 'white',
          borderRadius: '8px',
          transition: 'box-shadow 0.3s ease', // Transición suave para el boxShadow
          position: 'relative', // Posición relativa para superponer el efecto de hover
          boxShadow: hoveredCard === `card-${price.id}` ? '0px 0px 20px 0px rgba(255, 255, 255, 0.75)' : 'none', // Efecto de resplandor al pasar el cursor
        }}
         onMouseEnter={() => setHoveredCard(`card-${price.id}`)}
        onMouseLeave={() => setHoveredCard('')}
       >
          <CardContent>
            <Typography variant="h5">
              {price.product.name} - ${price.unit_amount / 100} {price.currency.toUpperCase()}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Divider style={{ backgroundColor: 'white', height: '2px' }} />
            </Box>
            <Typography variant="h6">
              Funcionalidades:
            </Typography>
            <List>
              <ListItem>
                • Acceso completo a la subida de imágenes de prototipos hechos en cualquier herramienta.
              </ListItem>
              <ListItem>
                • Visualización de la generación de código HTML y CSS en tiempo real.
              </ListItem>
              <ListItem>
                • Generar el código en los frameworks: React, VueJs y Angular.
              </ListItem>
              <ListItem>
                • Exportar el código generado en un archivo para uso del usuario.
              </ListItem>
            </List>
            <Box sx={{ my: 2 }}>
              <Divider style={{ backgroundColor: 'white', height: '2px' }} />
            </Box>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
              onClick={() => handleClickOpen(price)}
            >
              Escoger Plan
            </Button>
          </CardContent>
        </Card>
      ))}
      <DialogInfo description={dialogDescription} open={open} onClose={handleClose} onConfirm={handleConfirm}/>
    </div>
  );
};
