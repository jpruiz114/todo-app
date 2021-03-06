<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">

        <title>todo app</title>

        <link rel="stylesheet" href="bower/fontawesome/css/font-awesome.min.css">

        <link rel="stylesheet" href="bower/toastr/toastr.min.css">

        <link rel="stylesheet" href="css/tasks.css">
    </head>

    <body>
        <div id="wrapper">
            <div id="tasks">
                <h1>todos</h1>

                <div id="new-task">
                    <i id="clear-all-tasks" class="fa fa-check" aria-hidden="true"></i>

                    <input id="task-description" maxlength="100" placeholder="What needs to be done?" type="text" />
                </div>

                <div id="tasks-list">

                </div>

                <div id="tasks-info">
                    <div id="tasks-info-l">
                        <label id="items-left"></label>
                    </div>

                    <div id="tasks-info-c">
                        <a href="#" id="show-all">All</a>
                        <a href="#" id="show-active">Active</a>
                        <a href="#" id="show-completed">Completed</a>
                    </div>

                    <div id="tasks-info-r">
                        <a href="#" id="clear-completed">Clear completed</a>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="bower/jquery/dist/jquery.min.js"></script>

        <script type="text/javascript" src="bower/toastr/toastr.js"></script>

        <script type="text/javascript" src="js/dist/index.js"></script>

        <script type="text/javascript">
            /**
             * When all the website resources (Images, scripts) have been loaded.
             */
            $(window).on(
                'load',
                function() {
                    app.initialize('<?php echo $appUrl; ?>');
                }
            );
        </script>
    </body>
</html>
