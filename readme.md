# todo app

## Chosen framework

Laravel

Useful info to start a Laravel project:

https://devcenter.heroku.com/articles/getting-started-with-laravel

## Chosen hosting

Heroku

## Chosen database

MySQL

Be sure to configure your .env file with a MySQL db config.

## Automatic deployment

Added auto deploy from master branch into Heroku

## Issues history

### TODOAPP-006 / Enable unique user session
 
Solved on feature branch *test-browser-info*

Custom helper functions added to helper file

Reference link:

http://stackoverflow.com/questions/30804201/what-is-the-best-practice-to-create-a-custom-helper-function-in-php-laravel-5

- Within your app/Http directory, create a helpers.php file and add your functions.
- Within composer.json, in the autoload block, add "files": ["app/Http/helpers.php"].
- Run composer dump-autoload

Already merged to master

### TODOAPP-001 / Create database migrations

Create migration for sessions table:

```
php artisan make:migration create_sessions_table --create=sessions
```

Create migration for tasks table:

```
php artisan make:migration create_tasks_table --create=tasks
```

Run the migrations:

```
php artisan migrate
```

### TODOAPP-002 / Create models

Make the models:

```
php artisan make:model Session
```

```
php artisan make:model Task
```

### TODOAPP-003 / Create CRUD endpoints

Make the controllers:

```
php artisan make:controller TaskController --resource
```

To list the current routes:

```
php artisan route:list
```

Useful link on how to have multiple route files:

http://laravel-tricks.com/tricks/laravel-5-multiple-routes-files

Use this add-on on Firefox to test the API locally:

https://addons.mozilla.org/en-US/firefox/addon/poster/

Mapping of tasks:

#### GET
- TaskController@index
- list
- http://192.168.33.10/todo-app/public/task

#### POST
- TaskController@store
- create new task
- http://192.168.33.10/todo-app/public/task

#### PUT
- TaskController@update
- update an existing task
- http://192.168.33.10/todo-app/public/task/{id}

#### DELETE
- TaskController@destroy
- "delete" a task
- http://192.168.33.10/todo-app/public/task/{id}
