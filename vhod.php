<?php
session_start();
header('Content-Type: application/json');
require_once 'config/db.php';

$login = trim($_GET['login'] ?? '');
$password = $_GET['password'] ?? '';

if (!$login || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Введите логин и пароль']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = ? OR email = ?");
$stmt->execute([$login, $login]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Вход выполнен!',
        'redirect' => 'index.html'
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неверный логин или пароль']);
}
?>