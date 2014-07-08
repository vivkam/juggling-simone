<?php
header('Content-Type: audio/mpeg');
$speech = file_get_contents('http://translate.google.com/translate_tts?tl=en&q=' . $_GET["text"]);
echo $speech;
?>
