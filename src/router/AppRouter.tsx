import { Route, Routes } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// import App from "../App.tsx";
import { App } from '../App';
import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";
import { SubscripcionPage } from "@/subscripcion/pages/SubscripcionPage";

const stripePromise = loadStripe('pk_test_51OGv2gKIMRn2BAKSbYkIPNOlYbcFiO6GGwZ8gPWd1P6tGUfiKj3GF2ximR6JP56MRW650W39p4KIRA9fnJwxEUJT00EOrk8AEr');

export const AppRouter = () => {
  return (
    <Routes>
        <>
            <Route path="/" element={ <App /> }/>
            <Route path="/login" element={ <LoginPage /> }/>
            <Route path="/register" element={
              <Elements stripe={stripePromise}>
                  <RegisterPage />
              </Elements>
            } />
            <Route path="/suscripcion" element={
              <Elements stripe={stripePromise}>
                  <SubscripcionPage />
              </Elements>
            } />
        </>
    </Routes>
  )
}
