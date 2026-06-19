<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);

    Route::apiResource('users', UserController::class);

    Route::apiResource('customers', CustomerController::class);

    Route::get('/products/all', [ProductController::class, 'all']);
    Route::post('/products/images/upload', [ProductController::class, 'uploadImage']);
    Route::patch('/products/{product}/activate', [ProductController::class, 'activate']);
    Route::patch('/products/{product}/deactivate', [ProductController::class, 'deactivate']);
    Route::apiResource('products', ProductController::class);

    Route::apiResource('suppliers', SupplierController::class);

    Route::patch('/transactions/{transaction}/settle', [TransactionController::class, 'settle']);
    Route::apiResource('transactions', TransactionController::class);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
