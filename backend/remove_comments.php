<?php

function removeComments($filePath) {
    $content = file_get_contents($filePath);
    if ($content === false) return;

    $content = preg_replace('~/\*.*?\*~s', '', $content);
    $content = preg_replace('~//.*~', '', $content);
    $content = preg_replace('~<!--.*?-->~s', '', $content);
    $content = preg_replace('~\n{3,}~', "\n\n", $content);

    file_put_contents($filePath, $content);
    echo "Processed: $filePath\n";
}

$extensions = ['php', 'js', 'css'];
$dir = new RecursiveDirectoryIterator('.');
$iter = new RecursiveIteratorIterator($dir);

foreach ($iter as $file) {
    if ($file->isFile()) {
        $name = $file->getPathname();
        foreach ($extensions as $ext) {
            if (substr($name, -strlen($ext)) === $ext) {
                removeComments($name);
                break;
            }
        }
    }
}

echo "Done!\n";
