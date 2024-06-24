import { useEffect, useState } from 'react';
import { SubscriptionCardList } from '../components/SubscriptionCardList';
import { TopLevel } from '../interfaces/prices.response';
import { mockPrices } from '../helper/prices.helper';
import { MainLayout } from '@/layout/MainLayout';

export const SubscripcionPage = () => {

    const [prices, setPrices] = useState<TopLevel[]>([]);

    useEffect(() => {
        // Llamada a tu API para obtener los precios
        setPrices(mockPrices);
    }, []);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Ocupa toda la altura del viewport
        background: 'linear-gradient(to right, #4b4b8f, #757abf)', // Ejemplo de degradado que combina con el tema primary
        color: 'white', // Color del texto para contrastar con el fondo
    };


    return (
        <MainLayout>
            <div style={containerStyle}>
                <SubscriptionCardList prices={prices} />
            </div>
        </MainLayout>
    );

}
