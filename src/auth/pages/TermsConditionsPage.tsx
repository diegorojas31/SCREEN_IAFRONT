import { Box, Typography, Link } from '@mui/material';

export const TermsConditionsPage = () => {
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(180deg, #3b3b73 0%, #3A4FA4 50%, #7699D4 100%)',
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        p: 2 
      }}
    >
      <Box 
        sx={{ 
          p: 3, 
          borderRadius: 2, 
          overflowY: 'auto', 
          maxHeight: '80vh',
          maxWidth: '800px',
          mx: 'auto',
          my: 4,
          boxShadow: 3,
          color: 'white',
          background: 'linear-gradient(180deg, #1c1c2e 0%, #2e2e4f 50%, #3b3b73 100%)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Términos y Condiciones
        </Typography>
        <Typography variant="body1" paragraph>
          Última actualización: [25/06/2024]
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenido a MockupVision, el software proporcionado por CodeSync para la generación automática de código a partir de prototipos de diseños web. Al utilizar MockupVision, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos y condiciones, por favor absténgase de utilizar nuestro software.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Uso del Servicio
        </Typography>
        <Typography variant="body1" paragraph>
          MockupVision está destinado exclusivamente para diseñadores independientes, freelancers o empresas dedicadas al desarrollo de software. El software analiza imágenes de prototipos de diseños web para generar automáticamente código de páginas web.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Elegibilidad
        </Typography>
        <Typography variant="body1" paragraph>
          Los usuarios deben tener al menos 18 años de edad. Se espera que los usuarios sean diseñadores independientes, freelancers o representantes autorizados de empresas dedicadas al desarrollo de software.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Restricciones de Uso
        </Typography>
        <Typography variant="body1" paragraph>
          El software no debe utilizarse para copiar diseños existentes. Está estrictamente prohibida la reproducción no autorizada de diseños con derechos de autor o cualquier otra forma de infracción de propiedad intelectual.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Cuentas de Usuario y Suscripciones
        </Typography>
        <Typography variant="body1" paragraph>
          Cada usuario debe tener una cuenta activa y una suscripción válida para utilizar MockupVision. CodeSync se reserva el derecho de cancelar cualquier cuenta que no cumpla con estos requisitos de forma indefinida y sin previo aviso.
        </Typography>
        <Typography variant="body1" paragraph>
          Las suscripciones se cobran automáticamente según el tipo seleccionado (mensual, trimestral o anual) mediante la información de tarjeta proporcionada al registrar la cuenta.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Política de Privacidad
        </Typography>
        <Typography variant="body1" paragraph>
          Los detalles sobre cómo recopilamos, utilizamos y protegemos su información personal se describen en nuestra <Link href="/privacy-policy" underline="hover" color="primary">Política de Privacidad</Link>.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Propiedad Intelectual
        </Typography>
        <Typography variant="body1" paragraph>
          CodeSync retiene todos los derechos de propiedad intelectual sobre MockupVision y el código generado. Los usuarios tienen derecho a utilizar el código generado únicamente para sus proyectos personales o comerciales autorizados.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Responsabilidad y Sanciones
        </Typography>
        <Typography variant="body1" paragraph>
          CodeSync no se hace responsable de los diseños generados por los usuarios. Sin embargo, en caso de que un usuario cause daños a otro diseñador o empresa, CodeSync se reserva el derecho de buscar reparaciones y sancionar al usuario infractor.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Modificaciones a los Términos y Condiciones
        </Typography>
        <Typography variant="body1" paragraph>
          CodeSync se reserva el derecho de modificar estos términos y condiciones en cualquier momento y sin previo aviso. Las modificaciones entrarán en vigor inmediatamente después de su publicación en esta página.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Contacto
        </Typography>
        <Typography variant="body1" paragraph>
          Si tiene alguna pregunta o inquietud sobre estos Términos y Condiciones, contáctenos en:
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>CodeSync</strong><br />
          Av. Busch Calle Porongo #46<br />
          Correo electrónico: gabidhu@gmail.com<br />
          Teléfonos: 78504676 - 77049267
        </Typography>

      </Box>

      <Link href="/" underline="hover" color="white" sx={{ mt: 2 }}>
        <Typography variant="body2" color="white">
          Volver a la página principal
        </Typography>
      </Link>
    </Box>
  );
};
