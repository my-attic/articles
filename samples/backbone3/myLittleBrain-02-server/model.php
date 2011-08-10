<?php

    function save() {
        $values = json_decode(file_get_contents('php://input'), true);
        $handle = fopen($values[id].".json","w");
        fwrite($handle, json_encode($values));
        fclose($handle);
        echo json_encode($values);
    }

    function fetch() {
        $jsonFile = $_GET['id'].".json";
        $fh = fopen($jsonFile, 'r');
        $content = fread($fh, filesize($jsonFile));
        fclose($fh);
        echo $content;
    }

    function destroy() {
        $jsonFile = $_GET['id'].".json";
        $data = "{success: true}";
        //d1.destroy({success : function(r){console.log(r);}})
        unlink($jsonFile);
        echo json_encode($data);
    }

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            // create new item
            save();
            break;
        case 'GET':
            // get item(s)
            fetch();
            break;
        case 'PUT':
            // update item
            save();
            break;
        case 'DELETE':
            // delete item
            destroy();
            break;
    }

?>
 
