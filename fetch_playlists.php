<?php

function getFolders($dir) {
    $folders = [];
    if (is_dir($dir)) {
        $items = scandir($dir);
        foreach ($items as $item) {
            if ($item !== '.' && $item !== '..') {
                $path = $dir . DIRECTORY_SEPARATOR . $item;
                if (is_dir($path)) {
                    $infoFile = $path . DIRECTORY_SEPARATOR . 'info.json';
                    if (file_exists($infoFile)) {
                        $info = json_decode(file_get_contents($infoFile), true);
                        $folders[] = [
                            'name' => $item,
                            'cover' => $path . DIRECTORY_SEPARATOR . 'cover.jpg',
                            'album' => $info['album'] ?? 'Unknown Album',
                            'artist' => $info['artist'] ?? 'Unknown Artist'
                        ];
                    }
                }
            }
        }
    }
    return $folders;
}

$songsFolder = 'songs'; // Path to the songs folder
$folders = getFolders($songsFolder);

header('Content-Type: application/json');
echo json_encode($folders);

?>
