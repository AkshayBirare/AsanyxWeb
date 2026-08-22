#!/usr/bin/env python3
"""
SEC-001 Security Fix Test
Verify GET /api/contacts is properly gated behind admin authentication
"""
import requests
import os
import sys

# Read base URL from .env
BASE_URL = "https://asanyx-analytics.preview.emergentagent.com"
API_URL = f"{BASE_URL}/api"

# Test credentials
ADMIN_EMAIL = "admin@asanyxanalytics.com"
ADMIN_PASSWORD = "N_WglwMNmE-YR8iG-c-2"

def test_sec001():
    """Test SEC-001: GET /api/contacts requires authentication"""
    print("=" * 70)
    print("SEC-001 SECURITY FIX TEST")
    print("=" * 70)
    
    session = requests.Session()
    all_passed = True
    
    # TEST 1: Anonymous access should return 401
    print("\n[TEST 1] GET /api/contacts without authentication")
    try:
        resp = session.get(f"{API_URL}/contacts", timeout=10)
        print(f"  Status: {resp.status_code}")
        print(f"  Response: {resp.text[:200]}")
        
        if resp.status_code == 401:
            data = resp.json()
            if data.get('ok') == False and 'Unauthorized' in data.get('error', ''):
                print("  ✅ PASS: Returns 401 with Unauthorized error")
            else:
                print(f"  ❌ FAIL: Expected {{ok:false, error:'Unauthorized'}}, got {data}")
                all_passed = False
        else:
            print(f"  ❌ FAIL: Expected 401, got {resp.status_code}")
            all_passed = False
    except Exception as e:
        print(f"  ❌ FAIL: Exception - {e}")
        all_passed = False
    
    # TEST 2: Login with correct credentials
    print("\n[TEST 2] POST /api/admin/login with correct credentials")
    try:
        resp = session.post(
            f"{API_URL}/admin/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=10
        )
        print(f"  Status: {resp.status_code}")
        print(f"  Response: {resp.text[:200]}")
        print(f"  Cookies: {dict(session.cookies)}")
        
        if resp.status_code == 200:
            data = resp.json()
            if data.get('ok') == True and 'asanyx_admin' in session.cookies:
                print("  ✅ PASS: Login successful, cookie set")
            else:
                print(f"  ❌ FAIL: Expected ok:true and asanyx_admin cookie")
                all_passed = False
        else:
            print(f"  ❌ FAIL: Expected 200, got {resp.status_code}")
            all_passed = False
    except Exception as e:
        print(f"  ❌ FAIL: Exception - {e}")
        all_passed = False
    
    # TEST 3: Authenticated access should return 200 with data
    print("\n[TEST 3] GET /api/contacts with authentication cookie")
    try:
        resp = session.get(f"{API_URL}/contacts", timeout=10)
        print(f"  Status: {resp.status_code}")
        print(f"  Response: {resp.text[:300]}")
        
        if resp.status_code == 200:
            data = resp.json()
            if data.get('ok') == True and 'items' in data and isinstance(data['items'], list):
                print(f"  ✅ PASS: Returns 200 with {{ok:true, items:[...]}} (found {len(data['items'])} items)")
            else:
                print(f"  ❌ FAIL: Expected {{ok:true, items:[...]}}, got {data}")
                all_passed = False
        else:
            print(f"  ❌ FAIL: Expected 200, got {resp.status_code}")
            all_passed = False
    except Exception as e:
        print(f"  ❌ FAIL: Exception - {e}")
        all_passed = False
    
    # Summary
    print("\n" + "=" * 70)
    if all_passed:
        print("✅ SEC-001 TEST PASSED: All 3 checks successful")
        print("   - Anonymous access blocked (401)")
        print("   - Admin login working (200 + cookie)")
        print("   - Authenticated access allowed (200 + data)")
    else:
        print("❌ SEC-001 TEST FAILED: One or more checks failed")
    print("=" * 70)
    
    return all_passed

if __name__ == "__main__":
    success = test_sec001()
    sys.exit(0 if success else 1)
