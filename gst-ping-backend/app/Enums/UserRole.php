<?php

namespace App\Enums;

enum UserRole: string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';
    case CA_STAFF = 'ca-staff';
    case CA_SUPPORT = 'ca-support';

    /**
     * Get the display name for the role
     */
    public function getDisplayName(): string
    {
        return match($this) {
            self::SUPER_ADMIN => 'Super Administrator',
            self::ADMIN => 'CA Administrator',
            self::CA_STAFF => 'CA Staff',
            self::CA_SUPPORT => 'CA Support',
        };
    }

    /**
     * Get all role values as an array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get all roles with their display names
     */
    public static function options(): array
    {
        $options = [];
        foreach (self::cases() as $role) {
            $options[$role->value] = $role->getDisplayName();
        }
        return $options;
    }

    /**
     * Check if this role is an admin role
     */
    public function isAdmin(): bool
    {
        return in_array($this, [self::SUPER_ADMIN, self::ADMIN]);
    }

    /**
     * Get the default dashboard route for this role
     */
    public function getDashboardRoute(): string
    {
        return match($this) {
            self::SUPER_ADMIN => '/super-admin/dashboard',
            self::ADMIN => '/admin/dashboard',
            self::CA_STAFF => '/ca-staff/dashboard',
            self::CA_SUPPORT => '/ca-support/dashboard',
        };
    }
}