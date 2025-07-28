<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Super Admin Dashboard
     */
    public function superAdminDashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        
        return response()->json([
            'message' => 'Welcome to Super Admin Dashboard',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleDisplayName(),
            ],
            'permissions' => [
                'can_manage_all_users' => true,
                'can_manage_system_settings' => true,
                'can_access_all_data' => true,
            ],
        ]);
    }

    /**
     * CA Admin Dashboard
     */
    public function adminDashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        
        return response()->json([
            'message' => 'Welcome to CA Admin Dashboard',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleDisplayName(),
            ],
            'permissions' => [
                'can_manage_ca_users' => true,
                'can_manage_clients' => true,
                'can_manage_tax_returns' => true,
                'can_view_reports' => true,
            ],
        ]);
    }

    /**
     * CA Staff Dashboard
     */
    public function caStaffDashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        
        return response()->json([
            'message' => 'Welcome to CA Staff Dashboard',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleDisplayName(),
            ],
            'permissions' => [
                'can_view_clients' => true,
                'can_edit_tax_returns' => true,
                'can_view_assigned_tasks' => true,
            ],
        ]);
    }

    /**
     * CA Support Dashboard
     */
    public function caSupportDashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        
        return response()->json([
            'message' => 'Welcome to CA Support Dashboard',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleDisplayName(),
            ],
            'permissions' => [
                'can_view_clients' => true,
                'can_view_basic_reports' => true,
            ],
        ]);
    }

    /**
     * General admin method (accessible by super-admin and admin roles)
     */
    public function adminOnlyMethod(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->isAdmin()) {
            abort(403, 'Access denied. Admin privileges required.');
        }
        
        return response()->json([
            'message' => 'This is an admin-only method',
            'user_role' => $user->getRoleDisplayName(),
            'is_super_admin' => $user->isSuperAdmin(),
            'is_ca_admin' => $user->isCaAdmin(),
        ]);
    }

    /**
     * Dynamic dashboard that routes to appropriate dashboard based on user role
     */
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        
        return match($user->role) {
            \App\Enums\UserRole::SUPER_ADMIN => $this->superAdminDashboard($request),
            \App\Enums\UserRole::ADMIN => $this->adminDashboard($request),
            \App\Enums\UserRole::CA_STAFF => $this->caStaffDashboard($request),
            \App\Enums\UserRole::CA_SUPPORT => $this->caSupportDashboard($request),
        };
    }
}
