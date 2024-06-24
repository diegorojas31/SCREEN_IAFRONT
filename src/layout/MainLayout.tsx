import { ReactNode, useState } from "react";
import { Box, CssBaseline, Drawer, List, ListItemIcon, useTheme, IconButton, ListItemButton, Typography, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import menuItems from "./components/MenuItem";
import { useNavigate } from "react-router-dom";

interface MainLayout {
    children: ReactNode;
}

const drawerWidth = 240;

export const MainLayout = ({children}: MainLayout) => {
    const navigate = useNavigate();

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        // Lógica para cerrar sesión
        console.log("Logout clicked");
        navigate('/login');
    };

    const drawer = (
        <Box
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
                zIndex: theme.zIndex.drawer + 1,
                position: 'fixed', // Fijar posición para que se superponga
                height: '100%', // Cubrir toda la altura disponible
                bgcolor: 'primary.main' 
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 64}}> {/* Simulando un Toolbar */}
                <Typography variant="h6" mt={3} sx={{ color: 'primary.contrastText' }}>
                    Menú de Navegación
                </Typography>
            </Box>
            <Divider />
            <List sx={{p: 0}}>
                {menuItems.map((item, index) => (
                    <>
                        <ListItemButton key={index} href={item.link} sx={{p: 2}}>
                            <ListItemIcon sx={{color: 'white'}}>
                                {item.icon}
                            </ListItemIcon>
                            <Typography sx={{color: 'white'}}>
                                {item.name}
                            </Typography>
                        </ListItemButton>
                        <Divider />
                    </>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }} /> {/* Espacio flexible para alinear el botón a la derecha */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ position: 'fixed', zIndex: theme.zIndex.drawer + 2, left: 2 }} // Alineación a la derecha del Drawer
                >
                    <MenuIcon sx={{color: 'white'}} />
                </IconButton>
                {mobileOpen && (
                    <IconButton
                        color="warning"
                        aria-label="logout"
                        edge="end"
                        onClick={handleLogout}
                        sx={{ position: 'fixed', zIndex: theme.zIndex.drawer + 2, left: 200 }} // Alineación a la izquierda del Drawer
                    >
                        <ExitToAppIcon />
                    </IconButton>
                )}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                        zIndex: theme.zIndex.drawer + 1,
                        position: 'fixed', // Fijar posición para que se superponga
                        height: '100%', // Cubrir toda la altura disponible
                    }}
                    ModalProps={{
                        keepMounted: true, // Mejora del rendimiento de apertura en móviles.
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            {children}
        </>
    );
};