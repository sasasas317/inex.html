<!-- регистрация -->

<?php
// исправление CORS ошибки 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

//  Обработка preflight-запроса (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    // подключение
    $host = '127.0.0.1';
    $db = 'catalog_cases';
    $user = 'root';
    $pass = '';
    $charset = 'utf8';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $opt = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $pdo = new PDO($dsn, $user, $pass, $opt);

    $username = $_POST['username'] ;
    $email = $_POST['email'] ;
    $password = $_POST['password'];
    
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?,?,?)");
    $stmt->bindParam(1, $username);
    $stmt->bindParam(2, $email);
    $stmt->bindParam(3, $password);
    $stmt->execute();


    echo json_encode(['status' => 'success', 'message' => 'Пользователь зарегистрирован']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
