import React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import CreditCardIcon from '@mui/icons-material/CreditCard';

// Definir un tipo para los iconos que es un componente de React.
type MenuItemIcon = React.ReactElement;

interface MenuItem {
  name: string;
  icon: MenuItemIcon;
  link: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Generación de Código",
    icon: <CodeIcon />,
    link: "/generate-code"
  },
  {
    name: "Suscripciones",
    icon: <CreditCardIcon />,
    link: "/suscripcion"
  }
];

export default menuItems;
