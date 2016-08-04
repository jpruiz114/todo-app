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
        console.log("loadConfigCallback");

        app.listAllTasks();
    },

    /**
     *
     */
    listAllTasks: function() {
        var endpointConfig = app.apiConfig.tasks["list-all"];

        var path = endpointConfig["endpoint"];
        console.log("path" + " = " + path);

        var method = endpointConfig["method"];
        console.log("method" + " = " + method);

        jQuery.ajax({
            type: method,
            url: app.appUrl + "/" + path,
            data: {},
            dataType: "json",
            error: function (jqXHR, status) {
                console.log("error");

                // @todo
            },
            success: function (data, status, jqXHR) {
                console.log("ok");

                for (var i=0; i<data.length; i++) {
                    var obj = data[i];

                    var id, description, completed, active;

                    id = obj["id"];
                    console.log("id" + " = " + id);

                    description = obj["description"];
                    console.log("description" + " = " + description);

                    completed = obj["completed"];
                    console.log("completed" + " = " + completed);

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
                console.log("taskCheckClick");

                var parent = $(this).parent();
                console.dir(parent);

                var id = $(parent).attr("data-task-id");
                console.log("id" + " = " + id);

                var description = $(parent).find("input.task-description").val();
                console.log("description" + " = " + description);

                var completed = $(parent).attr("data-task-completed");
                console.log("completed" + " = " + completed);

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
                console.log("completed" + " = " + completed);

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
                console.log("taskRemoveClick");

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
        console.log("bindEventsCallback");


    },

    /**
     *
     */
    setItemsLeft: function() {
        console.log("setItemsLeft");

        var itemsLeft = $("#tasks-list").find("[data-task-completed='0']").length;
        console.log("itemsLeft" + " = " + itemsLeft);

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
                console.log("error");

                // @todo
            },
            success: function (data, status, jqXHR) {
                console.log("ok");

                $("#task-description").val("");

                console.dir(data);

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
                console.log("error");

                // @todo
            },
            success: function (data, status, jqXHR) {
                console.log("ok");

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
                console.log("error");

                // @todo
            },
            success: function (data, status, jqXHR) {
                console.log("ok");

                app.removeTaskFromList(id);

                toastr.success("Task deleted");
            }
        });
    },

    /**
     *
     */
    showAll: function() {
        console.log("showAll");

        $(".listed-task").show();
    },

    /**
     *
     */
    showActive: function() {
        console.log("showActive");

        // Hide the completed
        $("#tasks-list").find("[data-task-completed='1']").hide();

        // Show the active
        $("#tasks-list").find("[data-task-completed='0']").show();
    },

    /**
     *
     */
    showCompleted: function() {
        console.log("showCompleted");

        // Hide the active
        $("#tasks-list").find("[data-task-completed='0']").hide();

        // Show the completed
        $("#tasks-list").find("[data-task-completed='1']").show();
    },

    /**
     *
     */
    clearCompleted: function() {
        console.log("clearCompleted");

        var endpointConfig = app.apiConfig.tasks["clear-completed"];

        var path = endpointConfig["endpoint"];
        var method = endpointConfig["method"];

        jQuery.ajax({
            type: method,
            url: app.appUrl + "/" + path,
            data: {},
            dataType: "text",
            error: function (jqXHR, status) {
                console.log("error");

                // @todo
            },
            success: function (data, status, jqXHR) {
                console.log("ok");

                $("#tasks-list").find("[data-task-completed='1']").remove();

                toastr.success("Completed tasks cleared");
            }
        });
    }
};
