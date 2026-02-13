<?php
// Configuración
$receptor = "hello@triibumarketing.com";
$asunto = "Nuevo Lead desde Triibu Marketing Web";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Limpieza
    $nombre = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = strip_tags(trim($_POST["message"]));

    // Validación
    if (empty($nombre) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.html?status=error");
        exit;
    }

    // Contenido
    $contenido = "Has recibido un nuevo mensaje de contacto:\n\n";
    $contenido = "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Mensaje:\n$mensaje\n";
    $contenido .= "\n--------------------------\n";
    $contenido .= "Enviado desde: $origen";

    // Headers
    $headers = "From: noreply@triibumarketing.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Envío y Redirección
    if (mail($receptor, $asunto, $contenido, $headers)) {
        header("Location: success.html"); // <--- AQUÍ ESTÁ LA CLAVE
        exit;
    } else {
        header("Location: index.html?status=server_error");
        exit;
    }
} else {
    header("Location: index.html");
    exit;
}
?>