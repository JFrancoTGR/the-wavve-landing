<?php

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
// file_put_contents('log.txt', print_r($input, true));

if (
    ! $input ||
    empty($input['name']) ||
    empty($input['email']) ||
    empty($input['phone']) ||
    empty($input['contact_method'])
) {echo json_encode([
    'stauts'  => 'error',
    'message' => 'Problemas con el envío.',
]);
    exit;}

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

if ($http_code === 200) {
    echo json_encode(['status' => 'success']);
} else {
    error_log("error Zapier: $curl_error / HTTP $http_code / Reponse: $response");
    echo json_encode([
        'status'  => 'error',
        'message' => 'Error al enviar al webhook',
    ]);
}
