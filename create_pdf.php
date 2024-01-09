<?php


if (!function_exists('sortFiles')) {
    function sortFiles($path = '.') {
        $allFiles = [];
        $files = scandir($path);

        foreach ($files as $file) {
            if ($file == '.' || $file == '..' || $file == '.git') {
                continue;
            }

            $allFiles[] = $file;
            if (is_dir($path . DIRECTORY_SEPARATOR . $file)) {
                $allFiles[$file] = sortFiles($path . DIRECTORY_SEPARATOR  . $file);
            }
        }
        return $allFiles;
    }
}



/* TESTER */
if (!function_exists('tester')) {
    function tester($e = "", $x = "",  $y = "",  $z = "") {
        
        if ($x == "notheader" || $y == "notheader" || $z == "notheader") {
        } else {
            header('Content-Type: application/json');
        }
        if ($x == "notpretty" || $y == "notpretty" || $z == "notpretty") {
            echo json_encode($e);
        } else {
            echo json_encode($e, JSON_PRETTY_PRINT);
        }
        if ($x == "notexit" || $y == "notexit" || $z == "notexit") {
        } else {
            exit;
        }
    }
}

// tester(sortFiles("qrcodes"));

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="Description" content="Enter your description here" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <title>Title</title>
</head>

<style>
    .ew-col {
        -ms-flex: 0 0 10%;
        flex: 0 0 10%;
        max-width: 10%;
    }
    .ew-col img {
        width: 100%;
    }
</style>

<body>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>


    <div class="container-fluid">
        <div class="row qr-table"></div>
    </div>

    <script>
        let jsonData = `<?php echo json_encode(sortFiles("qrcodes"))?>`
        const codeData = JSON.parse(jsonData);
        $(document).ready(function () {
            let div = ""
            $.each(codeData, function (i, item) {
                div += `<div class="ew-col"><img src="qrcodes/${item}"></img></div>`

                if (i == 20999) {
                    $(`.qr-table`).html(div)
                }
            })
        })



    </script>

</body>

</html>