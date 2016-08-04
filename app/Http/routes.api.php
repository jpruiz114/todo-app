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

Route::resource('task', 'TaskController');

use App\Task;

Route::put(
    'tasks/clear-completed',
    function() {
        Task::where('completed', 1)->update(array('cleared' => 1));

        return response('Cleared.', 200)->header('Content-Type', 'text/html');
    }
);
