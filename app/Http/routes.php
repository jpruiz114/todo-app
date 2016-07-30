<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get(
	'/test-browser-info',
	function() {
		$ip = getUserIP();
		echo("ip" . " = " . $ip . "<br>");

		$browserObj = print_r($_SERVER, true);
		echo("browserObj" . " = " . $browserObj . "<br>");

		$uniqueBrowserId = getUniqueBrowserId();
		echo("uniqueBrowserId" . " = " . $uniqueBrowserId . "<br>");
	}
);
