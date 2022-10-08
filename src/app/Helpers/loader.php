<?php 
foreach (glob(__DIR__ . DIRECTORY_SEPARATOR . '*.php') as $path) {
    require_once(basename($path));
}