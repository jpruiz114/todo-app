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

Route::get(
    '/phpinfo',
    function() {
        phpinfo();
    }
);

use App\Session;
use App\Task;

Route::get(
    '/test-models',
    function() {
        $chromeHash = "a31011a5905ff907ae63de1ee70e0e23";
        $chromeSession = Session::firstOrCreate(array('hash' => $chromeHash));
        $chromeSessionID = $chromeSession->id;
        echo("chromeSessionID" . " = " . $chromeSessionID . "<br>");
        $chromeStr = print_r($chromeSession, true);
        echo($chromeStr . "<br>");

        $firefoxHash = "12e4c89efcfa11237fd53d298d3e78db";
        $firefoxSession = Session::firstOrCreate(array('hash' => $firefoxHash));
        $firefoxSessionID = $firefoxSession->id;
        echo("firefoxSessionID" . " = " . $firefoxSessionID . "<br>");
        $firefoxStr = print_r($firefoxSession, true);
        echo($firefoxStr . "<br>");

        $iexploreHash = "235bd632684526f43aed72fe68244739";
        $iexploreSession = Session::firstOrCreate(array('hash' => $iexploreHash));
        $iexploreSessionID = $iexploreSession->id;
        echo("iexploreSessionID" . " = " . $iexploreSessionID . "<br>");
        $iexploreStr = print_r($iexploreSession, true);
        echo($iexploreStr . "<br>");

        /* ***** */

        $task = Task::create(
            [
                'session_id' => $firefoxSession->id,
                'description' => generateRandomString(20)
            ]
        );
        $taskStr = print_r($task, true);
        echo($taskStr . "<br>");
    }
);

Route::get(
    '/test-models-update',
    function() {
        Task::find(1)->update(['completed' => 1]);
        $task1 = Task::find(array('id' => '1'));
        $taskStr = print_r($task1, true);
        echo($taskStr . "<br>");

        Task::find(2)->update(['active' => 0]);
        $task2 = Task::find(array('id' => '2'));
        $taskStr = print_r($task2, true);
        echo($taskStr . "<br>");

        Task::find(3)->update(['completed' => 1]);
        $task3 = Task::find(array('id' => '3'));
        $taskStr = print_r($task3, true);
        echo($taskStr . "<br>");

        Task::find(4)->update(['active' => 0]);
        $task4 = Task::find(array('id' => '4'));
        $taskStr = print_r($task4, true);
        echo($taskStr . "<br>");
    }
);
