<?php
// Configuración
$receptor = "hello@triibumarketing.com";
$asunto = "Nuevo Lead desde Triibu Marketing Web";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- 1. TRAMPA HONEYPOT ANTI-SPAM ---
    // Si el bot llenó el campo oculto, detenemos el proceso silenciosamente
    // y lo mandamos a 'success.html' para que el bot crea que tuvo éxito y no intente de nuevo.
    if (!empty($_POST["website_url"])) {
        header("Location: success.html");
        exit;
    }

    // --- 2. Limpieza de datos reales ---
    $nombre = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = strip_tags(trim($_POST["message"]));
    $origen = "Sitio Web Principal"; // <-- Agregué la variable que faltaba

    // --- 3. Validación ---
    if (empty($nombre) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.html?status=error");
        exit;
    }

    // --- 4. Contenido del correo ---
    $contenido = "Has recibido un nuevo mensaje de contacto:\n\n";
    $contenido .= "Nombre: $nombre\n"; // <-- Corregido para que no borre la primera línea
    $contenido .= "Email: $email\n";
    $contenido .= "Mensaje:\n$mensaje\n";
    $contenido .= "\n--------------------------\n";
    $contenido .= "Enviado desde: $origen";

    // --- 5. Headers ---
    $headers = "From: noreply@triibumarketing.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // --- 6. Envío y Redirección ---
    if (mail($receptor, $asunto, $contenido, $headers)) {
        header("Location: success.html");
        exit;
    } else {
        header("Location: index.html?status=server_error");
        exit;
    }
} else {
    header("Location: index.html");
    exit;
}
