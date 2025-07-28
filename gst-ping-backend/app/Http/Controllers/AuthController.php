<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => ['sometimes', Rule::in(UserRole::values())],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? UserRole::CA_SUPPORT->value,
        ]);

        Auth::login($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleDisplayName(),
                'dashboard_route' => $user->getDashboardRoute(),
            ],
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleDisplayName(),
                'dashboard_route' => $user->getDashboardRoute(),
            ],
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::logout();

        return response()->json([
            'message' => 'Logout successful'
        ]);
    }

    /**
     * Get current user info
     */
    public function user(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleDisplayName(),
                'role_value' => $user->role->value,
                'dashboard_route' => $user->getDashboardRoute(),
                'permissions' => [
                    'is_super_admin' => $user->isSuperAdmin(),
                    'is_ca_admin' => $user->isCaAdmin(),
                    'is_ca_staff' => $user->isCaStaff(),
                    'is_ca_support' => $user->isCaSupport(),
                    'is_admin' => $user->isAdmin(),
                ],
            ],
        ]);
    }

    /**
     * List all users (admin only)
     */
    public function listUsers(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->isAdmin()) {
            return response()->json([
                'message' => 'Access denied. Admin privileges required.'
            ], 403);
        }

        $users = User::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleDisplayName(),
                'role_value' => $user->role->value,
            ];
        });

        return response()->json([
            'users' => $users,
            'total' => $users->count(),
        ]);
    }
}
