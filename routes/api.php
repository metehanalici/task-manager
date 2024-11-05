<?php

use App\Http\Controllers\API\TaskController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tasks', TaskController::class);
});
