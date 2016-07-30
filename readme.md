# todo app

## Chosen framework

Laravel

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
