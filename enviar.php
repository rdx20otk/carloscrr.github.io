<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoge los datos del formulario
    $nombre = htmlspecialchars($_POST['nombre']);
    $correo = htmlspecialchars($_POST['correo']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    // Configura el destinatario y el asunto del correo
    $to = "rdx20otk@gmail.com"; // Reemplaza con tu dirección de correo
    $subject = "Nuevo mensaje de contacto";
    
    // Crea el cuerpo del mensaje
    $body = "Nombre: $nombre\nCorreo: $correo\nMensaje: $mensaje";
    
    // Configura los encabezados del correo
    $headers = "From: $correo\r\n";
    $headers .= "Reply-To: $correo\r\n";
    
    // Envía el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Método de solicitud no permitido.";
}
?>
