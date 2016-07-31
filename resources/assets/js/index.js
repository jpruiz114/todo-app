var app = {
    /**
     *
     */
    appUrl: null,

    /**
     *
     */
    resourcesUrl: null,

    /**
     *
     */
    apiConfig: null,

    /**
     * Method that initializes the app.
     */
    initialize: function(appUrl, resourcesUrl) {
        app.appUrl = appUrl;

        app.resourcesUrl = resourcesUrl;

        app.loadConfig(app.loadConfigCallback);
    },

    /**
     *
     * @param callback
     */
    loadConfig: function(callback) {
        $.ajax({
            async: false,
            global: false,
            url: app.resourcesUrl + "/assets/config.json",
            dataType: "json",
            error: function () {
                // @todo
            },
            success: function (data) {
                app.apiConfig = data.config.api;

                if (callback) {
                    callback();
                }
            }
        });
    },

    /**
     *
     */
    loadConfigCallback: function() {
        console.log("loadConfigCallback");

        app.bindEvents();
    },

    /**
     *
     */
    bindEvents: function() {
        $("#clear-all-tasks").click(
            function()	{
                console.log("clearAllTasks");
            }
        );

        $("#task-description").on(
            "keypress",
            function(e) {
                if (e.keyCode == 13) {
                    console.log("enterNewTask");

                    var taskDescription = $("#task-description").val();

                    if (taskDescription) {
                        app.addNewTask(taskDescription);
                    } else {
                        toastr.warning("Enter the task description");
                    }
                }
            }
        );
    },

    /**
     *
     * @param description
     */
    addNewTask: function(description) {
        var endpointConfig = app.apiConfig.tasks["create-new"];

        var path = endpointConfig["endpoint"];
        console.log("path" + " = " + path);

        var method = endpointConfig["method"];
        console.log("method" + " = " + method);

        var data = {description: description};

        jQuery.ajax({
            type: method,
            url: app.appUrl + "/" + path,
            data: data,
            dataType: "json",
            error: function (jqXHR, status) {
                console.log("error");

                // @todo
            },
            success: function (data, status, jqXHR) {
                console.log("ok");

                $("#task-description").val("");


            }
        });
    }
};
