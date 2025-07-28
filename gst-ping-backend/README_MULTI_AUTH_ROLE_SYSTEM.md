# Multi-Auth Role System Implementation

This document describes the unified multi-auth role system implemented in the GST Ping application.

## Overview

The application now uses a unified authentication system with role-based access control (RBAC) instead of separate authentication guards. All users are stored in the `users` table with a `role` field that determines their access level.

## User Roles

The system supports four user roles defined in `App\Enums\UserRole`:

1. **Super Administrator** (`super-admin`)
   - Full system access with all privileges
   - Can manage all users, settings, and content

2. **CA Administrator** (`admin`)
   - CA firm administrator with management privileges
   - Can manage clients, tax returns, staff, and most system features

3. **CA Staff** (`ca-staff`)
   - CA firm staff member with limited privileges
   - Can view and edit clients, tax returns, and assigned tasks

4. **CA Support** (`ca-support`)
   - CA firm support staff with basic privileges
   - Can view clients, tax returns, and basic information

## Key Components

### 1. User Model (`App\Models\User`)

The User model now includes:
- Role enum casting
- Role checking methods via `HasRoles` trait
- Dashboard route determination
- Permission checking

### 2. HasRoles Trait (`App\Traits\HasRoles`)

Provides reusable role checking methods:
- `hasRole($role)` - Check for specific role
- `hasAnyRole($roles)` - Check for any of multiple roles
- `hasAllRoles($roles)` - Check for all specified roles
- `isSuperAdmin()`, `isCaAdmin()`, `isCaStaff()`, `isCaSupport()` - Role-specific checks
- `isAdmin()` - Check if user is any type of admin
- `getDashboardRoute()` - Get role-appropriate dashboard route
- `getRoleDisplayName()` - Get human-readable role name

### 3. Role Middleware (`App\Http\Middleware\RoleMiddleware`)

Enhanced middleware that:
- Accepts multiple roles as parameters
- Works with the UserRole enum
- Provides clear error messages

### 4. Authentication Configuration

Updated `config/auth.php`:
- Removed separate `admin` guard
- All authentication uses the `web` guard
- Single `users` provider

## API Endpoints

### Authentication Endpoints

- **POST /auth/register** - Register a new user
- **POST /auth/login** - Login user
- **POST /auth/logout** - Logout user (requires auth)
- **GET /auth/user** - Get current user info (requires auth)

### Dashboard Endpoints

- **GET /dashboard** - Dynamic dashboard (requires auth)
- **GET /super-admin/dashboard** - Super Admin Dashboard (requires super-admin role)
- **GET /admin/dashboard** - CA Admin Dashboard (requires super-admin or admin role)
- **GET /ca-staff/dashboard** - CA Staff Dashboard (requires super-admin, admin, or ca-staff role)
- **GET /ca-support/dashboard** - CA Support Dashboard (requires any authenticated role)

### Admin Endpoints

- **GET /admin/users** - List all users (requires admin privileges)
- **GET /admin/admin-only-method** - Admin only method (requires admin privileges)

## Usage Examples

### Route Protection

```php
// Protect routes for specific roles
Route::middleware(['auth', 'role:super-admin,admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'adminDashboard']);
});

// Protect routes for single role
Route::middleware(['auth', 'role:ca-staff'])->group(function () {
    Route::get('/ca-staff/dashboard', [DashboardController::class, 'caStaffDashboard']);
});
```

### Controller Role Checking

```php
public function adminOnlyMethod()
{
    $user = auth()->user();
    
    if (!$user->isAdmin()) {
        abort(403, 'Access denied. Admin privileges required.');
    }
    
    // Method logic here
}
```

### View Role Checking

```blade
@if(auth()->user()->isAdmin())
    <div class="admin-only-content">
        <!-- Admin content -->
    </div>
@endif

@if(auth()->user()->hasAnyRole(['super-admin', 'admin']))
    <div class="management-tools">
        <!-- Management tools -->
    </div>
@endif
```

## Testing the System

### Sample Users

The system comes with pre-seeded test users:

| Email | Role | Password |
|-------|------|----------|
| super.admin@gstping.com | Super Administrator | password123 |
| admin@gstping.com | CA Administrator | password123 |
| staff@gstping.com | CA Staff | password123 |
| support@gstping.com | CA Support | password123 |
| test.admin@example.com | CA Administrator | password123 |
| test.staff@example.com | CA Staff | password123 |

### Testing Steps

1. **Start the application:**
   ```bash
   php artisan serve
   ```

2. **Test user registration:**
   ```bash
   curl -X POST http://localhost:8000/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123",
       "password_confirmation": "password123",
       "role": "admin"
     }'
   ```

3. **Test user login:**
   ```bash
   curl -X POST http://localhost:8000/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@gstping.com",
       "password": "password123"
     }'
   ```

4. **Test role-based access:**
   ```bash
   # Admin dashboard (requires admin or super-admin role)
   curl -X GET http://localhost:8000/admin/dashboard \
     -H "Authorization: Bearer YOUR_TOKEN"
   
   # Super admin dashboard (requires super-admin role only)
   curl -X GET http://localhost:8000/super-admin/dashboard \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

### Testing Role Restrictions

Try accessing different endpoints with users of different roles to verify the access controls:

1. Login as a CA Support user and try to access the Super Admin dashboard - should get 403 error
2. Login as a CA Staff user and try to access the Admin dashboard - should succeed
3. Login as an Admin user and try to access all dashboards - should succeed except Super Admin
4. Login as a Super Admin user - should have access to all endpoints

## Database Schema

The `users` table includes a `role` column:

```sql
ALTER TABLE users ADD COLUMN role ENUM('super-admin', 'admin', 'ca-staff', 'ca-support') DEFAULT 'ca-support' AFTER email;
```

## File Structure

```
app/
├── Enums/
│   └── UserRole.php                    # User role enum definition
├── Http/
│   ├── Controllers/
│   │   ├── AuthController.php          # Authentication endpoints
│   │   └── DashboardController.php     # Role-based dashboards
│   └── Middleware/
│       └── RoleMiddleware.php          # Role checking middleware
├── Models/
│   └── User.php                        # User model with role casting
└── Traits/
    └── HasRoles.php                    # Role checking trait

database/
├── migrations/
│   └── add_role_to_users_table.php     # Migration to add role column
└── seeders/
    └── UserRoleSeeder.php              # Seeder for sample users
```

## Advanced Usage

### Custom Role Scopes

```php
// Get all admin users
$admins = User::admins()->get();

// Get users with specific role
$staffMembers = User::withRole(UserRole::CA_STAFF)->get();

// Get users with any of multiple roles
$managers = User::withAnyRole([UserRole::SUPER_ADMIN, UserRole::ADMIN])->get();
```

### Dynamic Dashboard Routing

```php
// In your controller
public function redirectToDashboard()
{
    return redirect(auth()->user()->getDashboardRoute());
}
```

### Role-based Permissions

```php
public function canManageUsers()
{
    return auth()->user()->hasAnyRole([
        UserRole::SUPER_ADMIN,
        UserRole::ADMIN
    ]);
}
```

## Security Considerations

1. **Role Assignment**: Only super administrators should be able to assign roles to users
2. **Role Escalation**: Prevent users from escalating their own roles
3. **Token Security**: Implement proper token expiration and refresh mechanisms
4. **Input Validation**: Always validate role inputs against the UserRole enum
5. **Audit Trail**: Consider logging role changes and access attempts

## Troubleshooting

### Common Issues

1. **Trait not found error**: Run `composer dump-autoload` to refresh the autoloader
2. **Role enum not found**: Ensure the enum file is in the correct namespace
3. **Middleware not working**: Check that the middleware is registered in `bootstrap/app.php`
4. **Permission denied**: Verify the user has the correct role and the middleware parameters are correct

### Debug Commands

```bash
# Check user roles
php artisan tinker
User::all()->pluck('role', 'email');

# Verify middleware registration
php artisan route:list --middleware=role

# Test role checking
$user = User::find(1);
$user->hasRole('admin');
$user->isAdmin();
```

This implementation provides a robust, scalable role-based access control system that can be easily extended with additional roles and permissions as needed.