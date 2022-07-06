<?php
/*---------- Iniciando sesion ----------*/
include "./app/views/inc/security/start_session.php";
?>
<?php if (isset($_SESSION['nombre_user'])) {
    header('Location: '.URL.'home/');
    exit();
}?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="<?php echo URL ?>app/views/assets/img/ico.svg" type="image/x-icon">
    <title><?php echo RESTAURANT; ?></title>
    <link rel="stylesheet" href="<?php echo URL;?>app/views/assets/css/main.css" />
    <link href="<?php echo URL;?>app/views/assets/css/mdb.min.css" rel="stylesheet" />
</head>
<style>
    @import url('https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css');
    :root{
        --bg-primary: #7367f0;
    }
    .bg-primary {
        background-color: var(--bg-primary) !important;
    }
</style>
<body>
    <div class="container-fluid">
        <div class="d-flex justify-content-center align-items-center vh-100 bg-white w-100 m-0 p-0">
            <div class="row">
                <div class="col">
                    <div class="top-0">
                        <img src="<?php echo URL;?>app/views/assets/img/404.png" class="img-fluid" width="600" height="400"
                            alt="page-not-found">
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <a type="button" href="<?php echo URL; ?>" class="btn rounded-4 bg-primary text-white"><i class="fi fi-sr-home"></i> Return Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- MDB -->
    <?php include "./app/views/inc/script-dark.php"; ?>
</body>
</html>