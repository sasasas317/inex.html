<?php
session_start();
header('Content-Type: application/json');
require_once 'config/db.php';

$username = trim($_GET['username'] ?? '');
$email = trim($_GET['email'] ?? '');
$password = $_GET['password'] ?? '';

if (!$username || !$email || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Заполните все поля']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['status' => 'error', 'message' => 'Пароль слишком короткий']);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");

try {
    $stmt->execute([$username, $email, $passwordHash]);
    echo json_encode([
        'status' => 'success', 
        'message' => 'Регистрация успешна!',
        'redirect' => 'vhod.html'
    ]);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo json_encode(['status' => 'error', 'message' => 'Пользователь уже существует']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка сервера']);
    }
}
?>