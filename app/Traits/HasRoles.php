<?php

namespace App\Traits;

use App\Enums\UserRole;

trait HasRoles
{
    /**
     * Check if user has a specific role
     */
    public function hasRole(UserRole|string $role): bool
    {
        if (is_string($role)) {
            $role = UserRole::from($role);
        }
        
        return $this->role === $role;
    }

    /**
     * Check if user has any of the specified roles
     */
    public function hasAnyRole(array $roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if user has all of the specified roles
     */
    public function hasAllRoles(array $roles): bool
    {
        foreach ($roles as $role) {
            if (!$this->hasRole($role)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if user is a super administrator
     */
    public function isSuperAdmin(): bool
    {
        return $this->hasRole(UserRole::SUPER_ADMIN);
    }

    /**
     * Check if user is a CA administrator
     */
    public function isCaAdmin(): bool
    {
        return $this->hasRole(UserRole::ADMIN);
    }

    /**
     * Check if user is CA staff
     */
    public function isCaStaff(): bool
    {
        return $this->hasRole(UserRole::CA_STAFF);
    }

    /**
     * Check if user is CA support
     */
    public function isCaSupport(): bool
    {
        return $this->hasRole(UserRole::CA_SUPPORT);
    }

    /**
     * Check if user is any type of admin (super admin or CA admin)
     */
    public function isAdmin(): bool
    {
        return $this->role->isAdmin();
    }

    /**
     * Get the dashboard route for the user's role
     */
    public function getDashboardRoute(): string
    {
        return $this->role->getDashboardRoute();
    }

    /**
     * Get the human-readable role name
     */
    public function getRoleDisplayName(): string
    {
        return $this->role->getDisplayName();
    }

    /**
     * Scope query to users with specific role
     */
    public function scopeWithRole($query, UserRole|string $role)
    {
        if (is_string($role)) {
            $role = UserRole::from($role);
        }
        
        return $query->where('role', $role->value);
    }

    /**
     * Scope query to users with any of the specified roles
     */
    public function scopeWithAnyRole($query, array $roles)
    {
        $roleValues = array_map(function ($role) {
            return is_string($role) ? $role : $role->value;
        }, $roles);
        
        return $query->whereIn('role', $roleValues);
    }

    /**
     * Scope query to admin users only
     */
    public function scopeAdmins($query)
    {
        return $query->whereIn('role', [
            UserRole::SUPER_ADMIN->value,
            UserRole::ADMIN->value
        ]);
    }
}