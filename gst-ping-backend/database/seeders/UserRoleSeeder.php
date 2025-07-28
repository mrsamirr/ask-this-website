<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin user
        User::updateOrCreate(
            ['email' => 'super.admin@gstping.com'],
            [
                'name' => 'Super Administrator',
                'email' => 'super.admin@gstping.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::SUPER_ADMIN,
                'email_verified_at' => now(),
            ]
        );

        // Create CA Admin user
        User::updateOrCreate(
            ['email' => 'admin@gstping.com'],
            [
                'name' => 'CA Administrator',
                'email' => 'admin@gstping.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::ADMIN,
                'email_verified_at' => now(),
            ]
        );

        // Create CA Staff user
        User::updateOrCreate(
            ['email' => 'staff@gstping.com'],
            [
                'name' => 'CA Staff Member',
                'email' => 'staff@gstping.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::CA_STAFF,
                'email_verified_at' => now(),
            ]
        );

        // Create CA Support user
        User::updateOrCreate(
            ['email' => 'support@gstping.com'],
            [
                'name' => 'CA Support Member',
                'email' => 'support@gstping.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::CA_SUPPORT,
                'email_verified_at' => now(),
            ]
        );

        // Create additional test users
        User::updateOrCreate(
            ['email' => 'test.admin@example.com'],
            [
                'name' => 'Test Admin',
                'email' => 'test.admin@example.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::ADMIN,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'test.staff@example.com'],
            [
                'name' => 'Test Staff',
                'email' => 'test.staff@example.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::CA_STAFF,
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('Sample users created successfully:');
        $this->command->table(
            ['Email', 'Role', 'Password'],
            [
                ['super.admin@gstping.com', 'Super Administrator', 'password123'],
                ['admin@gstping.com', 'CA Administrator', 'password123'],
                ['staff@gstping.com', 'CA Staff', 'password123'],
                ['support@gstping.com', 'CA Support', 'password123'],
                ['test.admin@example.com', 'CA Administrator', 'password123'],
                ['test.staff@example.com', 'CA Staff', 'password123'],
            ]
        );
    }
}
