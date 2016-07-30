<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('session_id')->unsigned();

            $table->string('description', 100);

            $table->unsignedTinyInteger('completed')->default(0);

            $table->unsignedTinyInteger('active')->default(1);

            $table->timestamps();
        });

        Schema::table('tasks', function($table) {
            $table->foreign('session_id')->references('id')->on('sessions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tasks');
    }
}
