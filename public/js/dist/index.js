var app = {
    /**
     *
     */
    appUrl: null,

    /**
     *
     */
    apiConfig: null,

    /**
     * Method that initializes the app.
     */
    initialize: function(appUrl) {
        app.appUrl = appUrl;

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
            url: app.appUrl + "/config.json",
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
        void 0;

        app.listAllTasks();
    },

    /**
     *
     */
    listAllTasks: function() {
        var endpointConfig = app.apiConfig.tasks["list-all"];

        var path = endpointConfig["endpoint"];
        void 0;

        var method = endpointConfig["method"];
        void 0;

        jQuery.ajax({
            type: method,
            url: app.appUrl + "/" + path,
            data: {},
            dataType: "json",
            error: function (jqXHR, status) {
                void 0;

                // @todo
            },
            success: function (data, status, jqXHR) {
                void 0;

                for (var i=0; i<data.length; i++) {
                    var obj = data[i];

                    var id, description, completed, active;

                    id = obj["id"];
                    void 0;

                    description = obj["description"];
                    void 0;

                    completed = obj["completed"];
                    void 0;

                    app.addTaskToList(id, description, completed);
                }

                app.setItemsLeft();

                $("#tasks-info").show();

                app.bindEvents(app.bindEventsCallback);
            }
        });
    },

    /**
     *
     */
    bindEventsTaskCheck: function() {
        $(".task-check").click(
            function()	{
                void 0;

                var parent = $(this).parent();
                void 0;

                var id = $(parent).attr("data-task-id");
                void 0;

                var description = $(parent).find("input.task-description").val();
                void 0;

                var completed = $(parent).attr("data-task-completed");
                void 0;

                var icon = $(parent).find("i.task-check");

                if (completed == "0") {
                    $(icon).removeClass("fa-square-o");
                    $(icon).addClass("fa-check-square-o");

                    $(parent).attr("data-task-completed", "1");

                    $(parent).find("label.task-description").addClass("completed");
                }

                if (completed == "1") {
                    $(icon).removeClass("fa-check-square-o");
                    $(icon).addClass("fa-square-o");

                    $(parent).attr("data-task-completed", "0");

                    $(parent).find("label.task-description").removeClass("completed");
                }

                completed = $(parent).attr("data-task-completed");
                void 0;

                app.editExistingTask(id, description, completed);
            }
        );
    },

    /**
     *
     */
    unbindEventsTaskCheck: function() {
        $(".task-check").unbind();
    },

    /**
     *
     */
    bindEventsTaskDescription: function() {
        $("label.task-description").dblclick(
            function() {
                var parent = $(this).parent();

                $(this).hide();

                $(parent).find("input.task-description").show();
            }
        );

        $("input.task-description").on(
            "keypress",
            function(e) {
                if (e.keyCode == 13) {
                    var parent = $(this).parent();

                    var id = $(parent).attr("data-task-id");

                    var description = $(this).val();
                    $(parent).find("label.task-description").text(description);

                    var completed = $(parent).attr("data-task-completed");

                    $(this).hide();
                    $(parent).find("label.task-description").show();

                    app.editExistingTask(id, description, completed);
                }
            }
        );
    },

    /**
     *
     */
    unbindEventsTaskDescription: function() {
        $("label.task-description").unbind();
    },

    /**
     *
     */
    bindEventsTaskRemove: function() {
        $(".task-remove").click(
            function() {
                void 0;

                var parent = $(this).parent();

                var id = $(parent).attr("data-task-id");

                app.removeTask(id);
            }
        );
    },

    /**
     *
     */
    unbindEventsTaskRemove: function() {
        $(".task-remove").unbind();
    },

    /**
     *
     */
    bindEvents: function(callback) {
        $("#clear-all-tasks").click(
            function()	{
                void 0;
            }
        );

        $("#task-description").on(
            "keypress",
            function(e) {
                if (e.keyCode == 13) {
                    void 0;

                    var taskDescription = $("#task-description").val();

                    if (taskDescription) {
                        app.addNewTask(taskDescription);
                    } else {
                        toastr.warning("Enter the task description");
                    }
                }
            }
        );

        app.bindEventsTaskCheck();

        app.bindEventsTaskDescription();

        app.bindEventsTaskRemove();

        $("#show-all").click(
            function(e)	{
                app.showAll();

                e.preventDefault();
            }
        );

        $("#show-active").click(
            function(e)	{
                app.showActive();

                e.preventDefault();
            }
        );

        $("#show-completed").click(
            function(e)	{
                app.showCompleted();

                e.preventDefault();
            }
        );

        $("#clear-completed").click(
            function(e)	{
                app.clearCompleted();

                e.preventDefault();
            }
        );

        if (callback) {
            callback();
        }
    },

    /**
     *
     */
    bindEventsCallback: function() {
        void 0;


    },

    /**
     *
     */
    setItemsLeft: function() {
        void 0;

        var itemsLeft = $("#tasks-list").find("[data-task-completed='0']").length;
        void 0;

        var message = "";

        if (itemsLeft == 1) {
            message = "1 item left";
        } else {
            message = itemsLeft + " items left";
        }

        $("#items-left").text(message);
    },

    /**
     *
     * @param description
     */
    addTaskToList: function(id, description, completed) {
        var html = "";

        html += "<div class='listed-task' data-task-id='" + id + "' data-task-completed='" + completed + "'>";

        if (completed) {
            html += "<i class='task-check fa fa-check-square-o' aria-hidden='true'></i>";
        } else {
            html += "<i class='task-check fa fa-square-o' aria-hidden='true'></i>";
        }

        var labelClass = 'task-description';

        if (completed) {
            labelClass += ' completed';
        }

        html += "<label class='" + labelClass + "'>" + description + "</label>";
        html += "<input class='task-description' maxlength='100' type='text' value='" + description + "' />";

        html += "<i class='task-remove fa fa-times' aria-hidden='true'></i>";

        html += "</div>";

        $("#tasks-list").append(html);
    },

    /**
     *
     * @param id
     */
    removeTaskFromList: function(id) {
        $("#tasks-list").find("[data-task-id='" + id + "']").fadeOut(
            "slow",
            function() {
                $(this).remove();

                app.setItemsLeft();
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
        var method = endpointConfig["method"];

        var data = {description: description};

        jQuery.ajax({
            type: method,
            url: app.appUrl + "/" + path,
            data: data,
            dataType: "json",
            error: function (jqXHR, status) {
                void 0;

                // @todo
            },
            success: function (data, status, jqXHR) {
                void 0;

                $("#task-description").val("");

                void 0;

                app.addTaskToList(data.id, data.description, data.completed);

                // Remove the event listeners for all the elements with the same class and add them to all again.
                app.unbindEventsTaskCheck();
                app.bindEventsTaskCheck();

                // Remove the event listeners for all the elements with the same class and add them to all again.
                app.unbindEventsTaskDescription();
                app.bindEventsTaskDescription();

                // Remove the event listeners for all the elements with the same class and add them to all again.
                app.unbindEventsTaskRemove();
                app.bindEventsTaskRemove();

                app.setItemsLeft();

                toastr.success("Task created");
            }
        });
    },

    /**
     *
     * @param description
     */
    editExistingTask: function(id, description, completed) {
        var endpointConfig = app.apiConfig.tasks["update"];

        var path = endpointConfig["endpoint"].replace("{id}", id);
        var method = endpointConfig["method"];

        var data = {description: description, completed: completed};

        jQuery.ajax({
            type: method,
            url: app.appUrl + "/" + path,
            data: data,
            dataType: "json",
            error: function (jqXHR, status) {
                void 0;

                // @todo
            },
            success: function (data, status, jqXHR) {
                void 0;

                toastr.success("Task updated");

                app.setItemsLeft();
            }
        });
    },

    /**
     *
     * @param id
     */
    removeTask: function(id) {
        var endpointConfig = app.apiConfig.tasks["delete"];

        var path = endpointConfig["endpoint"].replace("{id}", id);
        var method = endpointConfig["method"];

        jQuery.ajax({
            type: method,
            url: app.appUrl + "/" + path,
            data: {},
            dataType: "text",
            error: function (jqXHR, status) {
                void 0;

                // @todo
            },
            success: function (data, status, jqXHR) {
                void 0;

                app.removeTaskFromList(id);

                toastr.success("Task deleted");
            }
        });
    },

    /**
     *
     */
    showAll: function() {
        void 0;

        $(".listed-task").show();
    },

    /**
     *
     */
    showActive: function() {
        void 0;

        // Hide the completed
        $("#tasks-list").find("[data-task-completed='1']").hide();

        // Show the active
        $("#tasks-list").find("[data-task-completed='0']").show();
    },

    /**
     *
     */
    showCompleted: function() {
        void 0;

        // Hide the active
        $("#tasks-list").find("[data-task-completed='0']").hide();

        // Show the completed
        $("#tasks-list").find("[data-task-completed='1']").show();
    },

    /**
     *
     */
    clearCompleted: function() {
        void 0;

        var endpointConfig = app.apiConfig.tasks["clear-completed"];

        var path = endpointConfig["endpoint"];
        var method = endpointConfig["method"];

        jQuery.ajax({
            type: method,
            url: app.appUrl + "/" + path,
            data: {},
            dataType: "text",
            error: function (jqXHR, status) {
                void 0;

                // @todo
            },
            success: function (data, status, jqXHR) {
                void 0;

                $("#tasks-list").find("[data-task-completed='1']").remove();

                toastr.success("Completed tasks cleared");
            }
        });
    }
};
