<?php

    function readJsonFile($file_name) {
        $fh = fopen($file_name, 'r');
        $content = fread($fh, filesize($file_name));
        fclose($fh);
        return $content;
    }

    $jsonFiles = glob(''."*.json");
    $json_string = '[';

    foreach($jsonFiles as $jsonFile) {
        $json_string = $json_string.readJsonFile($jsonFile).',';
    }

    $json_string = substr($json_string, 0, -1);
    $json_string = $json_string.']';

    echo $json_string;

?>