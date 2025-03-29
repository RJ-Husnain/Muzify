<?php
if (isset($_GET['playlist'])) {
    $playlist = $_GET['playlist'];
    $directory = "Songs/" . $playlist; // Updated path to 'Songs/PlaylistX'

    if (is_dir($directory)) {
        $songs = array_diff(scandir($directory), array('.', '..')); // Get all files excluding '.' & '..'
        echo json_encode(array_values($songs)); // Send JSON response
    } else {
        echo json_encode(["error" => "Playlist not found"]);
    }
}
?>
