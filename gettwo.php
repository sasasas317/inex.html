<?php

include_once "pdo.php";

$db = new DB();
$pdo = $db->connect();


if (isset($_GET['username']) && isset($_GET['email']) && isset($_GET['password'])) {
    try {
        $name = htmlspecialchars($_GET['name']);
        $username = htmlspecialchars($_GET['username']);
        $email = htmlspecialchars($_GET['email']);
        $phone = htmlspecialchars($_GET['phone']);
        $password = htmlspecialchars($_GET['password']);

        $stmt = $pdo->prepare("INSERT INTO user (username, email, password) VALUES (?, ?, ?)");
        $stmt->bindParam(2, $username);
        $stmt->bindParam(3, $email);
        $stmt->bindParam(5, $password);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Регистрация успешна!']);

    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Пользователь с таким именем уже существует']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
        }
    }
    exit;
}
?>
