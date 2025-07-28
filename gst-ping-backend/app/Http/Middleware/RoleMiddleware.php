<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        // Check if user is authenticated
        if (!$user) {
            abort(401, 'Authentication required.');
        }

        // If no roles specified, just check if user is authenticated
        if (empty($roles)) {
            return $next($request);
        }

        // Convert string roles to UserRole enums
        $allowedRoles = array_map(function ($role) {
            try {
                return UserRole::from($role);
            } catch (\ValueError $e) {
                // If invalid role provided, log and abort
                \Log::error("Invalid role '{$role}' provided to RoleMiddleware");
                abort(500, 'Invalid role configuration.');
            }
        }, $roles);

        // Check if user has any of the required roles
        if ($user->hasAnyRole($allowedRoles)) {
            return $next($request);
        }

        // User doesn't have required role
        $roleNames = array_map(fn($role) => $role->getDisplayName(), $allowedRoles);
        $requiredRoles = implode(', ', $roleNames);
        
        abort(403, "Access denied. Required role(s): {$requiredRoles}");
    }
}