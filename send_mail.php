<?php
// send_mail.php

// Configuramos la respuesta como JSON para que el JS la entienda
header('Content-Type: application/json');

// 1. CONFIGURACIÓN
// Pone aquí el correo donde quieres recibir los mensajes
$recipient_email = "tu_correo@triibumarketing.com";
// Pone aquí un correo de tu dominio (ej: no-reply@triibu...) para evitar SPAM
$sender_email = "no-reply@triibumarketing.com";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 2. OBTENER Y LIMPIAR DATOS
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // 3. VALIDACIÓN BÁSICA
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); // Error del cliente
        echo json_encode(["message" => "Please complete the form correctly."]);
        exit;
    }

    // 4. CONSTRUIR EL CORREO
    $subject = "New Contact from Website: $name";

    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Encabezados
    $email_headers = "From: $name <$sender_email>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // 5. ENVIAR
    if (mail($recipient_email, $subject, $email_content, $email_headers)) {
        http_response_code(200); // Éxito
        echo json_encode(["message" => "Thanks! Your message has been sent."]);
    } else {
        http_response_code(500); // Error del servidor
        echo json_encode(["message" => "Oops! Something went wrong and we couldn't send your message."]);
    }
} else {
    // Si intentan abrir el archivo directamente sin enviar datos
    http_response_code(403);
    echo json_encode(["message" => "There was a problem with your submission, please try again."]);
}
?>