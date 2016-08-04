var elixir = require('laravel-elixir');
var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.extend(
    'removeConsoleLogs',
    function(message) {
        new elixir.Task(
            'removeConsoleLogs',
            function() {
                var src = 'public/js/src/*.js';
                var dest = 'public/js/dist/';

                return gulp.src(src).pipe(stripDebug()).pipe(gulp.dest(dest));
            }
        )
    }
);

elixir(
    function(mix) {
        mix.sass('app.scss');
        mix.sass('tasks.scss');

        mix.removeConsoleLogs();
    }
);
