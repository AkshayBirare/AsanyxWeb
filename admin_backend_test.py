#!/usr/bin/env python3
"""
Admin Backend API Test Suite for ASANYX Analytics
Tests admin authentication and protected data endpoints
"""

import requests
import json
import sys
from datetime import datetime

# Load base URL from .env
BASE_URL = "https://asanyx-analytics.preview.emergentagent.com/api"

# Admin credentials from /app/memory/test_credentials.md
ADMIN_EMAIL = "admin@asanyxanalytics.com"
ADMIN_PASSWORD = "N_WglwMNmE-YR8iG-c-2"

def print_test(name, passed, details=""):
    """Print test result with formatting"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} | {name}")
    if details:
        print(f"    {details}")
    print()

def test_admin_login_wrong_password():
    """Test 1: POST /api/admin/login with wrong password → 401"""
    print("=" * 60)
    print("TEST 1: Admin Login - Wrong Password")
    print("=" * 60)
    try:
        payload = {
            "email": ADMIN_EMAIL,
            "password": "wrong_password_123"
        }
        response = requests.post(f"{BASE_URL}/admin/login", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 401 and
            data.get('ok') == False and
            data.get('error') == 'Invalid credentials'
        )
        
        print_test(
            "POST /api/admin/login (wrong password)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        return passed
    except Exception as e:
        print_test("POST /api/admin/login (wrong password)", False, f"Exception: {str(e)}")
        return False

def test_admin_login_wrong_email():
    """Test 2: POST /api/admin/login with wrong email → 401"""
    print("=" * 60)
    print("TEST 2: Admin Login - Wrong Email")
    print("=" * 60)
    try:
        payload = {
            "email": "wrong@email.com",
            "password": ADMIN_PASSWORD
        }
        response = requests.post(f"{BASE_URL}/admin/login", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 401 and
            data.get('ok') == False and
            data.get('error') == 'Invalid credentials'
        )
        
        print_test(
            "POST /api/admin/login (wrong email)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        return passed
    except Exception as e:
        print_test("POST /api/admin/login (wrong email)", False, f"Exception: {str(e)}")
        return False

def test_admin_login_empty_body():
    """Test 3: POST /api/admin/login with empty body → 401"""
    print("=" * 60)
    print("TEST 3: Admin Login - Empty Body")
    print("=" * 60)
    try:
        payload = {}
        response = requests.post(f"{BASE_URL}/admin/login", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 401 and
            data.get('ok') == False and
            data.get('error') == 'Invalid credentials'
        )
        
        print_test(
            "POST /api/admin/login (empty body)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        return passed
    except Exception as e:
        print_test("POST /api/admin/login (empty body)", False, f"Exception: {str(e)}")
        return False

def test_admin_full_flow():
    """Test 4-10: Full admin authentication and data access flow"""
    print("=" * 60)
    print("TEST 4-10: Full Admin Flow (Login → Session → Data → Logout)")
    print("=" * 60)
    
    results = []
    session = requests.Session()
    
    # Test 4: Login with correct credentials
    try:
        payload = {
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        }
        response = session.post(f"{BASE_URL}/admin/login", json=payload, timeout=10)
        data = response.json()
        
        # Check response
        passed = (
            response.status_code == 200 and
            data.get('ok') == True and
            data.get('email') == ADMIN_EMAIL
        )
        
        # Check for Set-Cookie header with asanyx_admin
        cookie_found = False
        httponly_flag = False
        if 'Set-Cookie' in response.headers:
            cookie_header = response.headers['Set-Cookie']
            cookie_found = 'asanyx_admin=' in cookie_header
            httponly_flag = 'HttpOnly' in cookie_header
        
        passed = passed and cookie_found
        
        print_test(
            "POST /api/admin/login (correct credentials)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}\n    Cookie found: {cookie_found}, HttpOnly: {httponly_flag}"
        )
        results.append(passed)
        
        if not passed:
            print("⚠️  Login failed, skipping remaining tests")
            return False
            
    except Exception as e:
        print_test("POST /api/admin/login (correct credentials)", False, f"Exception: {str(e)}")
        results.append(False)
        return False
    
    # Test 5: GET /api/admin/me without cookie (using fresh session)
    try:
        fresh_session = requests.Session()
        response = fresh_session.get(f"{BASE_URL}/admin/me", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 401 and
            data.get('ok') == False and
            data.get('error') == 'Unauthorized'
        )
        
        print_test(
            "GET /api/admin/me (without cookie)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("GET /api/admin/me (without cookie)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 6: GET /api/admin/me with cookie (using authenticated session)
    try:
        response = session.get(f"{BASE_URL}/admin/me", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            data.get('ok') == True and
            data.get('email') == ADMIN_EMAIL
        )
        
        print_test(
            "GET /api/admin/me (with cookie)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("GET /api/admin/me (with cookie)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 7: GET /api/admin/data without cookie (using fresh session)
    try:
        fresh_session = requests.Session()
        response = fresh_session.get(f"{BASE_URL}/admin/data", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 401 and
            data.get('ok') == False and
            data.get('error') == 'Unauthorized'
        )
        
        print_test(
            "GET /api/admin/data (without cookie)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("GET /api/admin/data (without cookie)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 8: GET /api/admin/data with cookie (using authenticated session)
    try:
        response = session.get(f"{BASE_URL}/admin/data", timeout=10)
        data = response.json()
        
        # Check response structure
        passed = (
            response.status_code == 200 and
            data.get('ok') == True and
            'contacts' in data and isinstance(data['contacts'], list) and
            'applications' in data and isinstance(data['applications'], list) and
            'newsletter' in data and isinstance(data['newsletter'], list) and
            'downloads' in data and isinstance(data['downloads'], list) and
            'stats' in data and isinstance(data['stats'], dict)
        )
        
        # Check stats object has numeric fields
        if passed and 'stats' in data:
            stats = data['stats']
            passed = (
                'contacts' in stats and isinstance(stats['contacts'], int) and
                'applications' in stats and isinstance(stats['applications'], int) and
                'newsletter' in stats and isinstance(stats['newsletter'], int) and
                'downloads' in stats and isinstance(stats['downloads'], int)
            )
        
        # Check that no _id fields are present in any array
        has_mongo_id = False
        if passed:
            for collection in ['contacts', 'applications', 'newsletter', 'downloads']:
                for item in data.get(collection, []):
                    if '_id' in item:
                        has_mongo_id = True
                        break
                if has_mongo_id:
                    break
        
        passed = passed and not has_mongo_id
        
        # Prepare summary for output
        summary = {
            'ok': data.get('ok'),
            'contacts_count': len(data.get('contacts', [])),
            'applications_count': len(data.get('applications', [])),
            'newsletter_count': len(data.get('newsletter', [])),
            'downloads_count': len(data.get('downloads', [])),
            'stats': data.get('stats', {}),
            'has_mongo_id': has_mongo_id
        }
        
        print_test(
            "GET /api/admin/data (with cookie)",
            passed,
            f"Status: {response.status_code}\n    Summary: {json.dumps(summary, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("GET /api/admin/data (with cookie)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 9: POST /api/admin/logout
    try:
        response = session.post(f"{BASE_URL}/admin/logout", timeout=10)
        data = response.json()
        
        # Check response
        passed = (
            response.status_code == 200 and
            data.get('ok') == True
        )
        
        # Check for Set-Cookie header clearing the cookie
        cookie_cleared = False
        if 'Set-Cookie' in response.headers:
            cookie_header = response.headers['Set-Cookie']
            # Cookie should be cleared (empty value or Max-Age=0)
            cookie_cleared = ('asanyx_admin=' in cookie_header and 
                            ('Max-Age=0' in cookie_header or 'asanyx_admin=;' in cookie_header))
        
        passed = passed and cookie_cleared
        
        print_test(
            "POST /api/admin/logout",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}\n    Cookie cleared: {cookie_cleared}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/admin/logout", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 10: GET /api/admin/me after logout (should be 401)
    try:
        response = session.get(f"{BASE_URL}/admin/me", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 401 and
            data.get('ok') == False and
            data.get('error') == 'Unauthorized'
        )
        
        print_test(
            "GET /api/admin/me (after logout)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("GET /api/admin/me (after logout)", False, f"Exception: {str(e)}")
        results.append(False)
    
    return all(results)

def test_repeated_failed_logins():
    """Test 11: Verify repeated failed logins don't crash the endpoint"""
    print("=" * 60)
    print("TEST 11: Repeated Failed Login Attempts")
    print("=" * 60)
    try:
        results = []
        for i in range(5):
            payload = {
                "email": ADMIN_EMAIL,
                "password": f"wrong_password_{i}"
            }
            response = requests.post(f"{BASE_URL}/admin/login", json=payload, timeout=10)
            data = response.json()
            
            # Each attempt should return 401 with Invalid credentials
            passed = (
                response.status_code == 401 and
                data.get('ok') == False and
                data.get('error') == 'Invalid credentials'
            )
            results.append(passed)
        
        all_passed = all(results)
        print_test(
            "Repeated failed login attempts (5x)",
            all_passed,
            f"All 5 attempts returned 401 with 'Invalid credentials': {all_passed}"
        )
        return all_passed
    except Exception as e:
        print_test("Repeated failed login attempts", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all admin backend API tests"""
    print("\n" + "=" * 60)
    print("ASANYX ANALYTICS - ADMIN BACKEND API TEST SUITE")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().isoformat()}")
    print(f"Admin Email: {ADMIN_EMAIL}")
    print("=" * 60 + "\n")
    
    results = {
        "Login - Wrong Password": test_admin_login_wrong_password(),
        "Login - Wrong Email": test_admin_login_wrong_email(),
        "Login - Empty Body": test_admin_login_empty_body(),
        "Full Admin Flow": test_admin_full_flow(),
        "Repeated Failed Logins": test_repeated_failed_logins()
    }
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed_count = sum(1 for v in results.values() if v)
    total_count = len(results)
    
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status} | {test_name}")
    
    print("=" * 60)
    print(f"TOTAL: {passed_count}/{total_count} test groups passed")
    print("=" * 60 + "\n")
    
    # Exit with appropriate code
    sys.exit(0 if all(results.values()) else 1)

if __name__ == "__main__":
    main()
