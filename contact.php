<?php
// Configuración básica
$receptor = "hello@triibumarketing.com";
$asunto = "Nuevo Lead desde Triibu Marketing Web";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- 1. TRAMPA HONEYPOT ---
    if (!empty($_POST["website_url"])) {
        header("Location: success.html");
        exit;
    }

    // --- 2. VALIDACIÓN reCAPTCHA v3 ---
    $recaptcha_secret = "6LeI9qEsAAAAAMQ8onwhwlOhrRv_7MHjg99NjtR7"; // Pon tu clave secreta aquí
    $recaptcha_token = $_POST['recaptcha_token'];

    // Verificamos con Google usando cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('secret' => $recaptcha_secret, 'response' => $recaptcha_token)));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $verify_response = curl_exec($ch);
    curl_close($ch);

    $response_data = json_decode($verify_response);

    // Si el score es menor a 0.5, es un bot. Bloqueamos el envío.
    if (!$response_data->success || $response_data->score < 0.5) {
        // Redirigimos silenciosamente para no darle pistas al bot
        header("Location: success.html");
        exit;
    }

    // --- 3. Limpieza de datos reales ---
    $nombre = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = strip_tags(trim($_POST["message"]));
    $origen = "Sitio Web Principal";

    // --- 4. Validación básica ---
    if (empty($nombre) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.html?status=error");
        exit;
    }

    // --- 5. Contenido del correo ---
    $contenido = "Has recibido un nuevo mensaje de contacto:\n\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Mensaje:\n$mensaje\n";
    $contenido .= "\n--------------------------\n";
    $contenido .= "Enviado desde: $origen\n";
    $contenido .= "Score de humanidad: " . $response_data->score; // Agregamos esto para que veas qué tan real es el usuario

    // --- 6. Headers ---
    $headers = "From: noreply@triibumarketing.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // --- 7. Envío y Redirección ---
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
