#!/bin/bash

# GST Ping Multi-Auth Role System API Test Script

BASE_URL="http://localhost:8000"

echo "=== GST Ping Multi-Auth Role System API Test ==="
echo ""

# Function to make API calls
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local headers=$4
    
    echo "➤ $method $endpoint"
    if [ -n "$data" ]; then
        if [ -n "$headers" ]; then
            curl -s -X $method "$BASE_URL$endpoint" \
                -H "Content-Type: application/json" \
                -H "$headers" \
                -d "$data" | jq .
        else
            curl -s -X $method "$BASE_URL$endpoint" \
                -H "Content-Type: application/json" \
                -d "$data" | jq .
        fi
    else
        if [ -n "$headers" ]; then
            curl -s -X $method "$BASE_URL$endpoint" \
                -H "$headers" | jq .
        else
            curl -s -X $method "$BASE_URL$endpoint" | jq .
        fi
    fi
    echo ""
}

# Test 1: Get API info
echo "1. Testing API Info Endpoint"
api_call "GET" "/"

# Test 2: Register a new admin user
echo "2. Testing User Registration (Admin)"
api_call "POST" "/auth/register" '{
    "name": "Test Admin",
    "email": "testadmin@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "admin"
}'

# Test 3: Login with the admin user
echo "3. Testing User Login (Admin)"
ADMIN_LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{
        "email": "admin@gstping.com",
        "password": "password123"
    }')
echo "$ADMIN_LOGIN_RESPONSE" | jq .

# Since we're using session-based auth, we need to use cookies
# For simplicity, let's test with pre-seeded users

# Test 4: Test role-based endpoints access
echo "4. Testing Role-Based Access Control"
echo ""

# Test with different users
USERS=("super.admin@gstping.com:Super Admin" "admin@gstping.com:CA Admin" "staff@gstping.com:CA Staff" "support@gstping.com:CA Support")

for user_info in "${USERS[@]}"; do
    IFS=':' read -r email role <<< "$user_info"
    echo "--- Testing with $role ($email) ---"
    
    # Login
    echo "Login:"
    LOGIN_RESPONSE=$(curl -s -c cookies.txt -X POST "$BASE_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d "{
            \"email\": \"$email\",
            \"password\": \"password123\"
        }")
    echo "$LOGIN_RESPONSE" | jq .
    
    # Test dashboard access
    echo "Testing dashboard access:"
    curl -s -b cookies.txt "$BASE_URL/dashboard" | jq .
    echo ""
    
    # Test super admin dashboard
    echo "Testing super admin dashboard:"
    SUPER_ADMIN_RESPONSE=$(curl -s -b cookies.txt "$BASE_URL/super-admin/dashboard" 2>/dev/null)
    if [[ "$SUPER_ADMIN_RESPONSE" == *"403"* ]] || [[ "$SUPER_ADMIN_RESPONSE" == *"Access denied"* ]]; then
        echo "❌ Access denied (expected for non-super-admin users)"
    else
        echo "✅ Access granted"
        echo "$SUPER_ADMIN_RESPONSE" | jq .
    fi
    echo ""
    
    # Test admin dashboard
    echo "Testing admin dashboard:"
    ADMIN_DASHBOARD_RESPONSE=$(curl -s -b cookies.txt "$BASE_URL/admin/dashboard" 2>/dev/null)
    if [[ "$ADMIN_DASHBOARD_RESPONSE" == *"403"* ]] || [[ "$ADMIN_DASHBOARD_RESPONSE" == *"Access denied"* ]]; then
        echo "❌ Access denied"
    else
        echo "✅ Access granted"
        echo "$ADMIN_DASHBOARD_RESPONSE" | jq .
    fi
    echo ""
    
    # Logout
    curl -s -b cookies.txt -X POST "$BASE_URL/auth/logout" > /dev/null
    rm -f cookies.txt
    
    echo "----------------------------------------"
    echo ""
done

echo "=== Test Complete ==="
echo ""
echo "Manual Testing Instructions:"
echo "1. Visit http://localhost:8000 to see the API documentation"
echo "2. Use the /test/roles endpoint for testing guidelines"
echo "3. Test different role combinations with the sample users"
echo ""
echo "Sample Users:"
echo "- super.admin@gstping.com:password123 (Super Administrator)"
echo "- admin@gstping.com:password123 (CA Administrator)"
echo "- staff@gstping.com:password123 (CA Staff)"
echo "- support@gstping.com:password123 (CA Support)"