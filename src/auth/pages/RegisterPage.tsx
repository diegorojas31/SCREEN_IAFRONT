
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RegisterPageComponent } from "../components/RegisterPageComponent";
import { CardComponent } from "../components/CardComponent";
import { registeredUsers } from "../helper/data";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  priceId: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate()

  const [step, setStep] = useState(1); // Controla el paso actual del formulario
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    priceId: 'price_1PClvFKIMRn2BAKSi1d021vw',
  });

  const [error, setError] = useState<string | null>(null);

  // Ir al siguiente paso
  const nextStep = (): void => {
    // Verificar si el correo ya está registrado
    const isRegistered = registeredUsers.some(user => user.email === formData.email);
    
    if (isRegistered) {
      setError('El correo ya está registrado. Por favor verifique sus datos');
      return;
    }

    setError(null);
    setStep(step + 1);
  };

  // Ir al paso anterior
  const prevStep = (): void => {
    setStep(step - 1);
  };

  // Manejar cambio en los inputs
  const handleChange = (input: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSuccessfulPayment = (paymentMethodId: string) => {
      // Aquí tienes el paymentMethodId para enviarlo al servidor
      // junto con otros datos de formData si es necesario
      console.log("Payment Method ID:", paymentMethodId);
      console.log("Datos:", formData);
      // Aquí puedes llamar a tu backend para procesar todo el registro y pago
      navigate("/suscripcion")
  };

  switch(step) {
    case 1:
      return (
        <RegisterPageComponent
          nextStep={nextStep}
          handleChange={handleChange}
          formData={formData}
          currentStep={step}
          error={error}
        />
      );
    case 2:
      return (
        <CardComponent
          prevStep={prevStep}
          onSuccessfulPayment={handleSuccessfulPayment}
          currentStep={step}
        />
      );
    default:
      return <div>Form Completed</div>;
  }
}

