<?php

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if( !isset($input['g-recaptcha-response'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Sin token de reCAPTCHA',
    ]);
    exit;
}

$recaptchaSecret = 'API_KEY';
$recaptchaToken = $input['g-recaptcha-response'];

$verifyResponse = file_get_contents(
    "https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaToken}"
);

$recaptchaData = json_decode($verifyResponse, true);

if (
    !$recaptchaData['sucess'] ||
    $recaptchaData['action'] !== 'submit'
){
    echo json_encode([
        'status' => 'error',
        'message' => 'Verificación de reCAPTCHA fallida.',
    ]);
    exit;
}

file_put_contents('recaptcha_debug_log', print_r($recaptchaData, true));

if (
    ! $input ||
    empty($input['name']) ||
    empty($input['email']) ||
    empty($input['phone']) ||
    empty($input['contact_method'])
) {echo json_encode([
    'status'  => 'error',
    'message' => 'Problemas con el envío.',
]);
    exit;}

// ---------- Envío a Zapier ----------

$zapier_webhook_url = 'https://hooks.zapier.com/hooks/catch/4924950/uok7dbz/';

$data = [
    'full_name'      => $input['name'],
    'email'          => $input['email'],
    'phone_number'   => $input['phone'],
    'contact_method' => $input['contact_method'],
    'utm_source'     => $input['utm_source'],
    'utm_medium'     => $input['utm_medium'],
    'utm_campaign'   => $input['utm_campaign'],
    'utm_content'    => $input['utm_content'],
    'utm_adset'      => $input['utm_adset'],
    'utm_adname'     => $input['utm_adname'],
    'utm_term'       => $input['utm_term'],
];

$ch = curl_init($zapier_webhook_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);

$response   = curl_exec($ch);
$http_code  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// ----------- Registro en Klaviyo con API --------------

$klaviyo_api_key = 'API_KEY';
$klaviyo_url = "https://a.klaviyo.com/api/profiles/";

$klaviyo_data = [
    'data' => [
        'type' => 'profile',
        'attributes' => [
            'email'       => $input['email'],
            'first_name'  => $input['name'],
            // 'phone_number' => $input['phone'], // opcional, debe estar en formato E.164 si lo usas
            // puedes agregar otros atributos estándar si lo deseas
        ]
    ]
];

$headers = [
    'Content-Type: application/json',
    'revision: 2023-02-22',
    'Authorization: Klaviyo-API-Key ' . $klaviyo_api_key
];

$ch = curl_init($klaviyo_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($klaviyo_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$klaviyo_response = curl_exec($ch);
$klaviyo_http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$klaviyo_error = curl_error($ch);
curl_close($ch);

// Opcional: registro en archivo de log
file_put_contents('klaviyo_response_log.txt', $klaviyo_response . "\n", FILE_APPEND);

if ($http_code === 200 || ($klaviyo_http_code === 200 || $klaviyo_http_code === 201)) {
    echo json_encode(['status' => 'success']);
} else {
    error_log("error Zapier: $curl_error / HTTP $http_code / Reponse: $response");
    error_log("Klaviyo error: $klaviyo_error / HTTP $klaviyo_http_code / Response: $klaviyo_response");
    echo json_encode([
        'status'  => 'error',
        'message' => 'Error al enviar los datos hacia al menos alguno de los destinos.',
    ]);
}
