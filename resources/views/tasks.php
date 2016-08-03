<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">

        <title>todo app</title>

        <link rel="stylesheet" href="<?php echo $resourcesUrl; ?>/assets/bower/fontawesome/css/font-awesome.min.css">

        <link rel="stylesheet" href="<?php echo $resourcesUrl; ?>/assets/bower/toastr/toastr.min.css">

        <link rel="stylesheet" href="<?php echo $appUrl; ?>/css/tasks.css">
    </head>

    <body>
        <div id="wrapper">
            <div id="tasks">
                <h1>todos</h1>

                <div id="new-task">
                    <i id="clear-all-tasks" class="fa fa-check" aria-hidden="true"></i>

                    <input id="task-description" placeholder="What needs to be done?" type="text" />
                </div>

                <div id="tasks-list">

                </div>
            </div>
        </div>

        <script type="text/javascript" src="<?php echo $resourcesUrl; ?>/assets/bower/jquery/dist/jquery.min.js"></script>

        <script type="text/javascript" src="<?php echo $resourcesUrl; ?>/assets/bower/toastr/toastr.js"></script>

        <script type="text/javascript" src="<?php echo $resourcesUrl; ?>/assets/js/dist/index.js"></script>

        <script type="text/javascript">
            /**
             * When all the website resources (Images, scripts) have been loaded.
             */
            $(window).on(
                'load',
                function() {
                    app.initialize('<?php echo $appUrl; ?>', '<?php echo $resourcesUrl; ?>');
                }
            );
        </script>
    </body>
</html>
