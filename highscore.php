<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/homecss.css">
	<title>Highscore</title>
</head>
<body>

<?php
header('Cache-Control: no-cache');
header('Pragma: no-cache');

function write_php_ini($array, $file)
{
    $res = array();
    foreach($array as $key => $val)
    {
        if(is_array($val))
        {
            $res[] = "[$key]";
            foreach($val as $skey => $sval) $res[] = "$skey = ".(is_numeric($sval) ? $sval : '"'.$sval.'"');
        }
        else $res[] = "$key = ".(is_numeric($val) ? $val : '"'.$val.'"');
    }
    safefilerewrite($file, implode("\r\n", $res));
}

function safefilerewrite($fileName, $dataToSave)
{    if ($fp = fopen($fileName, 'w'))
    {
        $startTime = microtime(TRUE);
        do
        {            $canWrite = flock($fp, LOCK_EX);
           // If lock not obtained sleep for 0 - 100 milliseconds, to avoid collision and CPU load
           if(!$canWrite) usleep(round(rand(0, 100)*1000));
        } while ((!$canWrite)and((microtime(TRUE)-$startTime) < 5));

        //file was locked so now we can store information
        if ($canWrite)
        {            fwrite($fp, $dataToSave);
            flock($fp, LOCK_UN);
        }
        fclose($fp);
    }

}
$ini_array = null;
if (isset($_POST["namn"]) && isset($_POST["score"])) {
  $ini_array = parse_ini_file("hs.ini");
  $ini_array[$_POST["namn"]] = $_POST["score"];
  write_php_ini($ini_array, "hs.ini");
} else {
  $ini_array = parse_ini_file("hs.ini");
}
foreach ($ini_array as $skey => $sval) {
  print("person:".$skey." value:".$sval."<br>");
}
?>

</body>
</html>
