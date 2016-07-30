<?php

/**
 * Function that allows to get the user ip.
 * @return mixed
 */
function getUserIP()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if (filter_var($client, FILTER_VALIDATE_IP)) {
        $ip = $client;
    } elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
        $ip = $forward;
    } else {
        $ip = $remote;
    }

    return $ip;
}

/**
 * Function that returns a md5 hash to identify the current browser in the current ip address.
 * For more info check: https://amiunique.org/
 * @return string
 */
function getUniqueBrowserId()
{
    // @todo: Add more $_SERVER details to increase the hash.

    $ip = getUserIp();

    $httpUserAgent = $_SERVER['HTTP_USER_AGENT'];

    $hash = md5($ip . "/" . $httpUserAgent);

    return $hash;
}
