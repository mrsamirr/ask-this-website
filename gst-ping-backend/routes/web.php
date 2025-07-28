<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth');
Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth');

/*
|--------------------------------------------------------------------------
| Role-Based Dashboard Routes
|--------------------------------------------------------------------------
*/

// Super Admin Dashboard - only accessible by super-admin role
Route::middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('/super-admin/dashboard', [DashboardController::class, 'superAdminDashboard']);
});

// CA Admin Dashboard - accessible by super-admin and admin roles
Route::middleware(['auth', 'role:super-admin,admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'adminDashboard']);
    Route::get('/admin/users', [AuthController::class, 'listUsers']);
    Route::get('/admin/admin-only-method', [DashboardController::class, 'adminOnlyMethod']);
});

// CA Staff Dashboard - accessible by super-admin, admin, and ca-staff roles
Route::middleware(['auth', 'role:super-admin,admin,ca-staff'])->group(function () {
    Route::get('/ca-staff/dashboard', [DashboardController::class, 'caStaffDashboard']);
});

// CA Support Dashboard - accessible by all authenticated users
Route::middleware(['auth', 'role:super-admin,admin,ca-staff,ca-support'])->group(function () {
    Route::get('/ca-support/dashboard', [DashboardController::class, 'caSupportDashboard']);
});

// Dynamic dashboard route that redirects based on user role
Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware('auth');

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'GST Ping Multi-Auth Role System API',
        'version' => '1.0.0',
        'endpoints' => [
            'auth' => [
                'POST /auth/register' => 'Register a new user',
                'POST /auth/login' => 'Login user',
                'POST /auth/logout' => 'Logout user (requires auth)',
                'GET /auth/user' => 'Get current user info (requires auth)',
            ],
            'dashboards' => [
                'GET /dashboard' => 'Dynamic dashboard (requires auth)',
                'GET /super-admin/dashboard' => 'Super Admin Dashboard (requires super-admin role)',
                'GET /admin/dashboard' => 'CA Admin Dashboard (requires super-admin or admin role)',
                'GET /ca-staff/dashboard' => 'CA Staff Dashboard (requires super-admin, admin, or ca-staff role)',
                'GET /ca-support/dashboard' => 'CA Support Dashboard (requires any authenticated role)',
            ],
            'admin' => [
                'GET /admin/users' => 'List all users (requires admin privileges)',
                'GET /admin/admin-only-method' => 'Admin only method (requires admin privileges)',
            ],
        ],
        'available_roles' => [
            'super-admin' => 'Super Administrator',
            'admin' => 'CA Administrator',
            'ca-staff' => 'CA Staff',
            'ca-support' => 'CA Support',
        ],
    ]);
});

// Test route to demonstrate role checking
Route::get('/test/roles', function () {
    return response()->json([
        'message' => 'Role system test endpoints',
        'test_instructions' => [
            '1. Register users with different roles',
            '2. Login with each user',
            '3. Test access to different dashboard endpoints',
            '4. Verify role-based restrictions',
        ],
        'sample_registration' => [
            'endpoint' => 'POST /auth/register',
            'payload' => [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'role' => 'admin', // optional, defaults to ca-support
            ],
        ],
    ]);
});
