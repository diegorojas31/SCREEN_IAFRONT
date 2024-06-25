import { Box, Typography, Link } from '@mui/material';

export const PrivacyPolicyPage = () => {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        p: 3,
        background: 'linear-gradient(180deg, #3b3b73 0%, #3A4FA4 50%, #7699D4 100%)',
      }}>
        <Box sx={{
          p: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          maxWidth: '800px',
          maxHeight: '80vh',
          overflowY: 'auto',
          color: 'white',
          background: 'linear-gradient(180deg, #1c1c2e 0%, #2e2e4f 50%, #3b3b73 100%)',
        }}>
          <Typography variant="h4" gutterBottom>
            Política de Privacidad
          </Typography>
          <Typography variant="body1" paragraph>
            Última actualización: [25/06/2024]
          </Typography>
          <Typography variant="body1" paragraph>
            En CodeSync, valoramos su privacidad y nos comprometemos a proteger su información personal. Esta Política de Privacidad describe cómo recopilamos, usamos y compartimos su información cuando utiliza nuestro software y servicios, específicamente MockupVision.
          </Typography>
          <Typography variant="h6" gutterBottom>
            1. Información que Recopilamos
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>1.1 Información Personal</strong><br />
            - Nombre: Para identificar al usuario.<br />
            - Correo Electrónico: Para comunicaciones y recuperación de cuenta.<br />
            - Contraseña: Para autenticación y seguridad.<br />
            - Teléfono: Para autenticidad del usuario y soporte.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>1.2 Información de Pago</strong><br />
            - Tarjetas de Crédito: Para procesar suscripciones y pagos relacionados con el uso de MockupVision.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>1.3 Información de Uso</strong><br />
            - Diseños o Prototipos: Los diseños y prototipos entregados al sistema para ser analizados.<br />
            - Código Generado: Toda la información del código generado por MockupVision.<br />
            - Historial y Reportes: Almacenamiento de los códigos generados para historial y reportes a los administradores.
          </Typography>
          <Typography variant="h6" gutterBottom>
            2. Cómo Usamos Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>2.1 Para Proporcionar y Mejorar Nuestros Servicios</strong><br />
            - Para crear y gestionar su cuenta en MockupVision.<br />
            - Para procesar transacciones y suscripciones.<br />
            - Para analizar y generar códigos a partir de sus diseños o prototipos.<br />
            - Para mantener un historial de códigos generados y proporcionar reportes.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>2.2 Comunicaciones</strong><br />
            - Para enviarle actualizaciones, boletines informativos y ofertas promocionales relacionadas con MockupVision.<br />
            - Para responder a sus consultas y comentarios.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>2.3 Cumplimiento Legal</strong><br />
            - Para cumplir con nuestras obligaciones legales y regulativas.
          </Typography>
          <Typography variant="h6" gutterBottom>
            3. Cómo Compartimos Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>3.1 Proveedores de Servicios</strong><br />
            - Compartimos su información con proveedores de servicios que nos ayudan a operar y mejorar MockupVision (por ejemplo, procesamiento de pagos, alojamiento de datos).
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>3.2 Cumplimiento Legal y Protección</strong><br />
            - Podemos divulgar su información para cumplir con leyes y regulaciones aplicables, procesos legales o solicitudes gubernamentales.
          </Typography>
          <Typography variant="h6" gutterBottom>
            4. Seguridad de la Información
          </Typography>
          <Typography variant="body1" paragraph>
            Utilizamos medidas de seguridad adecuadas para proteger su información personal contra accesos no autorizados, alteraciones, divulgación o destrucción.
          </Typography>
          <Typography variant="h6" gutterBottom>
            5. Sus Derechos
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>5.1 Acceso y Corrección</strong><br />
            - Usted tiene derecho a acceder y corregir su información personal.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>5.2 Eliminación</strong><br />
            - Puede solicitar la eliminación de su información personal, sujeto a ciertas excepciones legales.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>5.3 Oposición y Restricción</strong><br />
            - Puede oponerse o solicitar la restricción del procesamiento de su información personal en ciertas circunstancias.
          </Typography>
          <Typography variant="h6" gutterBottom>
            6. Retención de Datos
          </Typography>
          <Typography variant="body1" paragraph>
            Retenemos su información personal durante el tiempo que sea necesario para cumplir con los fines descritos en esta Política de Privacidad, salvo que la ley exija o permita un período de retención más largo.
          </Typography>
          <Typography variant="h6" gutterBottom>
            7. Cambios a Esta Política de Privacidad
          </Typography>
          <Typography variant="body1" paragraph>
            Podemos actualizar esta Política de Privacidad ocasionalmente. Publicaremos cualquier cambio en esta página y actualizaremos la fecha de "Última actualización" arriba indicada. Le recomendamos revisar esta política periódicamente.
          </Typography>
          <Typography variant="h6" gutterBottom>
            8. Contacto
          </Typography>
          <Typography variant="body1" paragraph>
            Si tiene preguntas o inquietudes sobre esta Política de Privacidad, por favor contáctenos en:
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>CodeSync</strong><br />
            Av. Busch Calle Porongo #46<br />
            gabdihu@gmail.com<br />
            78504676 - 77049267
          </Typography>
        </Box>
        <Link href="/" underline="hover" color="white" sx={{ mt: 2 }}>
          <Typography variant="body2" color="white">
            Volver a la página principal
          </Typography>
        </Link>
    </Box>
  )
}
